/** Error con código HTTP, para que el errorHandler responda con el status correcto. */
export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const badRequest = (message: string) => new HttpError(400, message);
export const unauthorized = (message: string) => new HttpError(401, message);
export const conflict = (message: string) => new HttpError(409, message);
