import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ name: "Roomies Time API", version: "1.0.0" });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(env.port, () => {
  console.log(`Servidor escuchando en http://localhost:${env.port}`);
  console.log(`Healthcheck: http://localhost:${env.port}/api/healthcheck`);
});

// Cierra el pool de Prisma al detener el proceso (Ctrl+C, reinicio de ts-node-dev).
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(() => {
      void prisma.$disconnect().finally(() => process.exit(0));
    });
  });
}

export default app;
