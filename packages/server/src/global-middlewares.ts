import type { Request, Response, NextFunction as NextFn } from 'express';
import * as utilities from './utilities';
import { ApiError } from './ApiError';
import httpStatus from 'http-status';

export const globalError = () => {
  return (error: Error, _: Request, response: Response, __: NextFn) => {
    const apiError = ApiError.fromError(error);
    utilities.errorResponse(response, apiError);
  };
};

export const global404 = () => {
  return (_: Request, response: Response) => {
    const apiError = new ApiError('Not Found', httpStatus.NOT_FOUND);
    utilities.errorResponse(response, apiError);
  };
};
