import { NextFunction, Request, Response } from "express";

import * as authService from "../services/auth.service";
import { unauthorized } from "../utils/httpError";

import "../types/express";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, password } = req.body ?? {};

    const result = await authService.register({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body ?? {};

    const result = await authService.login({ email, password });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw unauthorized("No autenticado.");
    }

    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
}
