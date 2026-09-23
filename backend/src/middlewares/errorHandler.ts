import { NextFunction, Request, Response } from "express";

import { HttpError } from "../utils/httpError";

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    status: "error",
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

// Express identifica el manejador de errores por sus 4 parámetros, por eso
// `_next` se declara aunque no se use.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ status: "error", message: err.message });
    return;
  }

  // Un error no esperado es un bug del servidor: lo logueamos completo pero no
  // exponemos el detalle al cliente.
  console.error("[error]", err);

  res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
}
