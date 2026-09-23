import { PrismaClient } from "@prisma/client";

import { env } from "./env";

// En desarrollo, ts-node-dev reinicia el módulo en cada cambio. Guardamos la
// instancia en globalThis para no abrir un pool de conexiones nuevo cada vez.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.nodeEnv === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (env.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
