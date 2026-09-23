import { NextFunction, Request, Response } from "express";

import { getUserById, verifyToken } from "../services/auth.service";
import { unauthorized } from "../utils/httpError";

import "../types/express";

/**
 * Extrae el JWT de `Authorization: Bearer <token>`, lo verifica y deja el
 * usuario en `req.user`. Responde 401 si falta, es inválido o expiró.
 */
export async function authenticateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw unauthorized("Falta el encabezado Authorization: Bearer <token>.");
    }

    const token = header.slice("Bearer ".length).trim();

    if (!token) {
      throw unauthorized("Token no proporcionado.");
    }

    const payload = verifyToken(token);

    // Releemos el usuario: el token puede seguir siendo válido después de que
    // la cuenta fue eliminada.
    const user = await getUserById(payload.sub);

    if (!user) {
      throw unauthorized("El usuario del token ya no existe.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
