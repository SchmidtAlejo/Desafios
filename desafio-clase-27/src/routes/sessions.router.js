import { Router } from 'express';
import passport from 'passport';
import { generateToken, passportCall } from '../utils.js';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

// router.post('/login', passport.authenticate('login', { failureRedirect: '/login?error=Error 500 - error' }), (req, res) => {
//     let user = req.user

//     const token = generateToken(user)
//     res.cookie('token', token, { maxAge: 600000, httpOnly: true })
//     return res.status(200).json({ user, token });
// })

// router.post('/signup', passport.authenticate('signup', { failureRedirect: '/signup?error=Error 500 - error' }), (req, res) => {
//     return res.send(`Signup successful`)
// })

// router.get('/logout', (req, res) => {

//     res.clearCookie('token');
//     return res.redirect("/login")
// });

// router.get('/github', passport.authenticate("github", { scope: ['user:email'] }), (req, res) => { })

// router.get('/callbackGithub', passport.authenticate("github", { failureRedirect: "/api/sessions/errorGitHub" }), (req, res) => {

//     let user = req.user

//     const token = generateToken(user)
//     res.cookie('token', token, { maxAge: 600000, httpOnly: true })
//     return res.status(200).json({ user, token });
// })
// router.get("/errorGitHub", (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.redirect('/login?error=Error 500 - error')

// })

// router.get('/current', passportCall('jwt', { session: false }), (req, res) => {
//     res.send({ user: req.user });
// })

router.post('/login', SessionsController.login);
router.post('/signup', SessionsController.signup);
router.get('/logout', SessionsController.logout);
router.get('/github', SessionsController.githubAuth);
router.get('/callbackGithub', SessionsController.githubCallback);
router.get('/errorGitHub', SessionsController.githubError);
router.get('/current', SessionsController.getCurrentUser);

export default router;

