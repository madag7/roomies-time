import { PublicUser } from "../services/auth.service";

// Se declara en un `.ts` (y no en un `.d.ts`) para que ts-node-dev lo incluya
// en la compilación: solo procesa los archivos alcanzables por import.
declare global {
  namespace Express {
    interface Request {
      /** Lo adjunta authenticateToken cuando el JWT es válido. */
      user?: PublicUser;
    }
  }
}

export {};
