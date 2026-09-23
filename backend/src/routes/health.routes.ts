import { Router } from "express";

import { healthcheck } from "../controllers/health.controller";

const router = Router();

// GET /api/healthcheck
router.get("/", healthcheck);

export default router;
