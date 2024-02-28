import { Router } from "express";

const router = Router();

router.get("/check-auth", (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated() });
});

export default router;