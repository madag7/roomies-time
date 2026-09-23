import { prisma } from "../config/prisma";

export type DatabaseStatus = {
  connected: boolean;
  responseTimeMs: number;
  error?: string;
};

/**
 * Ejecuta un query trivial contra PostgreSQL para comprobar que la conexión
 * está viva (no basta con que el proceso arranque: Prisma conecta en lazy).
 */
export async function checkDatabaseConnection(): Promise<DatabaseStatus> {
  const startedAt = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, responseTimeMs: Date.now() - startedAt };
  } catch (error) {
    return {
      connected: false,
      responseTimeMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
