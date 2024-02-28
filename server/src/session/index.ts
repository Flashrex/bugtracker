import { Router } from "express";

const router = Router();

router.get("/check-auth", (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated() });
});

export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

export default router;