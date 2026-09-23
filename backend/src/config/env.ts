import dotenv from "dotenv";

dotenv.config();

const DEV_JWT_SECRET = "roomies-time-dev-secret-change-me";

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? DEV_JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
};

if (!env.databaseUrl) {
  console.warn(
    "[env] DATABASE_URL no está definida. Revisa tu archivo .env (ver .env.example)."
  );
}

if (env.jwtSecret === DEV_JWT_SECRET) {
  if (env.nodeEnv === "production") {
    throw new Error(
      "[env] JWT_SECRET es obligatoria en producción: el valor por defecto es público."
    );
  }
  console.warn(
    "[env] JWT_SECRET no está definida, usando el valor por defecto de desarrollo."
  );
}
