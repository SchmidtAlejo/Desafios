import { Router } from 'express';
import UserManager from '../classes/UserManager.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';
const router = Router()

let userManager = new UserManager()

// router.post('/login', async (req, res) => {

//     let { email, password } = req.body
//     if (!email || !password) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `Faltan datos` })
//     }

//     let user = await userManager.getBy({ email })
//     if (!user) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(401).json({ error: `Credenciales incorrectas` })
//     }

//     if (!isValidPassword(user, password)) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(401).json({ error: `Credenciales incorrectas` })
//     }

//     user = { ...user }
//     delete user.password
//     req.session.user = user // en un punto de mi proyecto

//     console.log(req.session.user);

//     // res.setHeader('Content-Type', 'application/json')
//     // res.status(200).json({
//     //     message: "Login correcto", user
//     // })

//     if (user.email === "adminCoder@coder.com") {
//         res.cookie('role', "admin", { maxAge: 1000 * 60 * 60 * 24, signed: true })
//     }
//     else {
//         res.cookie('role', "user", { maxAge: 1000 * 60 * 60 * 24, signed: true })
//     }

//     return res.redirect("/products")
// })

router.post('/login', passport.authenticate('login', { failureRedirect: '/login?error=Error 500 - error' }), (req, res) => {
    let user = req.user

    user = { ...user }
    delete user.password
    req.session.user = user // en un punto de mi proyecto

    if (user.email === "adminCoder@coder.com") {
        res.cookie('role', "admin", { maxAge: 1000 * 60 * 60 * 24, signed: true })
    }
    else {
        res.cookie('role', "user", { maxAge: 1000 * 60 * 60 * 24, signed: true })
    }

    return res.redirect(`/products`)
})

// router.post('/signup', async (req, res) => {

//     let { name, email, password } = req.body
//     console.log(!name || !email || !password);
//     if (!name || !email || !password) {
//         // res.setHeader('Content-Type', 'application/json');
//         // return res.status(400).json({ error: `Faltan datos` })
//         return res.redirect("/signup?error=Faltan datos")
//     }

//     let existe = await userManager.getBy({ email })
//     if (existe) {
//         // res.setHeader('Content-Type', 'application/json');
//         // return res.status(400).json({ error: `Ya existen usuarios con email ${email}` })
//         return res.redirect(`/signup?error=Ya existen usuarios con email ${email}`)

//     }

//     // validaciones extra...
//     password = createHash(password)

//     try {
//         let newUser = await userManager.create({ name, email, password })

//         // res.setHeader('Content-Type', 'application/json');
//         // return res.status(200).json({ payload: "signup successful", newUser });
//         return res.redirect(`/signup?message=Signup successful to ${name}`)

//     } catch (error) {
//         return res.redirect(`/signup?error=Error 500 - error`)

//     }


// })

router.post('/signup', passport.authenticate('signup', { failureRedirect: '/signup?error=Error 500 - error' }), (req, res) => {
    return res.redirect(`/signup?message=Signup successful to ${req.user.name}`)
})

router.get('/logout', (req, res) => {

    res.clearCookie('role');

    req.session.destroy(e => {
        if (e) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json(
                {
                    error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle: `${e.message}`
                }
            )

        }
    })
    return res.redirect("/login")
});

router.get('/github', passport.authenticate("github", { scope: ['user:email'] }), (req, res) => { })

router.get('/callbackGithub', passport.authenticate("github", { failureRedirect: "/api/sessions/errorGitHub" }), (req, res) => {

    req.session.user = req.user
    res.redirect("/products");
})
router.get("/errorGitHub", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/login?error=Error 500 - error')

})

export default router;