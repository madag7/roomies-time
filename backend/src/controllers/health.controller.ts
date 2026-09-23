import { Request, Response } from "express";

import { checkDatabaseConnection } from "../services/health.service";

export async function healthcheck(_req: Request, res: Response) {
  const database = await checkDatabaseConnection();

  res.status(database.connected ? 200 : 503).json({
    status: database.connected ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
    database: {
      engine: "postgresql",
      connected: database.connected,
      responseTimeMs: database.responseTimeMs,
      ...(database.error ? { error: database.error } : {}),
    },
  });
}
