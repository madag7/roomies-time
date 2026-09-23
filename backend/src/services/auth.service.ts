import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

import { env } from "../config/env";
import { prisma } from "../config/prisma";
import { badRequest, conflict, unauthorized } from "../utils/httpError";

const SALT_ROUNDS = 10;

/** Campos que se devuelven al cliente: nunca incluyen passwordHash. */
const publicUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type PublicUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JwtPayload = {
  sub: string;
  email: string;
};

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function normalizeEmail(email: unknown): string {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function signToken(user: { id: string; email: string }): string {
  const payload: JwtPayload = { sub: user.id, email: user.email };

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  });
}

export async function register(input: RegisterInput) {
  const firstName = input.firstName?.trim();
  const lastName = input.lastName?.trim();
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!firstName || !lastName || !email || !password) {
    throw badRequest(
      "firstName, lastName, email y password son obligatorios."
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    throw badRequest("El email no tiene un formato válido.");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw badRequest(
      `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw conflict("Ya existe una cuenta registrada con ese email.");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { firstName, lastName, email, passwordHash },
    select: publicUserSelect,
  });

  return { user, token: signToken(user) };
}

export async function login(input: LoginInput) {
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!email || !password) {
    throw badRequest("email y password son obligatorios.");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Mismo mensaje para email inexistente y contraseña incorrecta: no revelamos
  // qué emails están registrados.
  const invalid = unauthorized("Email o contraseña incorrectos.");

  if (!user) {
    // Hash ficticio para que el tiempo de respuesta no delate si el email existe.
    await bcrypt.compare(password, "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv");
    throw invalid;
  }

  const matches = await bcrypt.compare(password, user.passwordHash);

  if (!matches) {
    throw invalid;
  }

  const { passwordHash: _passwordHash, ...publicUser } = user;

  return { user: publicUser as PublicUser, token: signToken(user) };
}

export async function getUserById(id: string): Promise<PublicUser | null> {
  return prisma.user.findUnique({
    where: { id },
    select: publicUserSelect,
  });
}

export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    if (typeof decoded === "string" || !decoded.sub) {
      throw unauthorized("Token inválido.");
    }

    return { sub: String(decoded.sub), email: String(decoded.email ?? "") };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw unauthorized("El token expiró.");
    }
    throw unauthorized("Token inválido.");
  }
}
