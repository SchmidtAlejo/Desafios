import { Router } from 'express';
import passport from 'passport';
const router = Router()
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

router.get('/current', (req, res) => {
    if (req.session.user) {
        res.send({ user: req.session.user })
    }
    else {
        res.send({ user: null })
    }
});

export default router;