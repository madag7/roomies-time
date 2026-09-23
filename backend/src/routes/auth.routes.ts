import { Router } from "express";

import { login, me, register } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// GET /api/auth/me (protegida)
router.get("/me", authenticateToken, me);

export default router;
