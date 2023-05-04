import type { HttpStatus } from './types';

export class ApiError extends Error {
  constructor (public message: string, public statusCode?: HttpStatus) {
    super();
    this.statusCode = statusCode ?? 500;
  }

  public static fromError (error: Error, statusCode?: HttpStatus): ApiError {
    if (!(error instanceof ApiError)) {
      return new ApiError(error.message, statusCode);
    } else {
      return error;
    }
  }

  public toJSON (): { statusCode: HttpStatus, error: string } {
    return {
      statusCode: this.statusCode!,
      error: this.message
    };
  }
}
