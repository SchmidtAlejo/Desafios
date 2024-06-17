import { createHash, generateToken, transporter, verifyToken } from '../utils/utils.js';
import passport from 'passport';
import UserDTO from '../dao/dto/user.dto.js'
import UserDAO from '../dao/UserDAO.js'
import bcrypt from "bcrypt";

class SessionsController {
  static login = (req, res, next) => {
    passport.authenticate('login', { failureRedirect: '/login?error=Error 500 - error' }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = generateToken(user);
        res.cookie('token', token, { maxAge: 600000, httpOnly: true });
        // return res.status(200).json({ user, token });
        res.redirect('/products')
      });
    })(req, res, next);
  };

  static signup = (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "email exists" });
      }
      return res.status(200).json({ user });
    })(req, res, next);
  };

  static logout = (req, res) => {
    res.clearCookie('token');
    return res.redirect("/login");
  };

  static githubAuth = (req, res, next) => passport.authenticate("github", { scope: ['user:email'] }, () => { })(req, res, next);

  static githubCallback(req, res, next) {
    passport.authenticate("github", { failureRedirect: "/api/sessions/errorGitHub" }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Si la autenticación falla, puedes redirigir o enviar una respuesta de error
        return res.redirect('/login?error=Error 500 - error');
      }
      // Si la autenticación es exitosa, genera el token y envía la respuesta
      const token = generateToken(user);
      res.cookie('token', token, { maxAge: 600000, httpOnly: true });
      return res.status(200).json({ user, token });
    })(req, res, next);
  }

  static githubError = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/login?error=Error 500 - error');
  };

  static getCurrentUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      const userDTO = new UserDTO(user)
      return res.status(200).json({ user });
    })(req, res, next)
  };

  static forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await UserDAO.getBy({ email: email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const token = generateToken(user);

    const resetUrl = `http://localhost:8080/reset-password/${token}`;

    transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`
    });

    res.send('Password reset email sent');
  };

  static changePassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(400).send('Token is invalid or has expired');
    }

    const user = await UserDAO.getBy({ _id: decodedToken.user._id });

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }


    const isSamePassword = await bcrypt.compare(password, user.password);
    const passwordHashed = createHash(password);
    console.log(isSamePassword);
    console.log(passwordHashed);
    console.log(user.password);
    if (isSamePassword) {
      return res.status(400).send(`
        <h1>No puedes usar la misma contraseña</h1>
        <a href="http://localhost:8080/forgot-password">Restablece la contraseña</a>
        `);
    }

    user.password = createHash(password);

    await UserDAO.updatePassword(decodedToken.user._id, passwordHashed);

    res.send('Password has been reset');
  };

  static updateAlternatePremium = async (req, res) => {
    const { id } = req.params;

    const user = await UserDAO.getBy({ _id: id });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const role = user.role === 'premium' ? 'user' : 'premium';
    await UserDAO.updateUser(id, { role })
    res.success(role);
  }
}

export default SessionsController;