import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    res.render('index');
});

router.get("/chat", async (req, res) => {
    res.render('chat');
});

export default router;