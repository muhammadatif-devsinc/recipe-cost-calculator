import type { Request, Response, NextFunction as NextFn } from 'express';
import { AppWhiteListedDomains } from './config';
import * as utilities from './utilities';
import { ApiError } from './ApiError';
import httpStatus from 'http-status';
import cors from 'cors';

export const globalError = () => {
  return (error: Error, _: Request, response: Response, __: NextFn) => {
    const isApiError = error instanceof ApiError;
    const apiError = !isApiError ? ApiError.fromError(error) : error;
    utilities.errorResponse(response, apiError);
  };
};

export const global404 = () => {
  return (_: Request, response: Response) => {
    const apiError = new ApiError('Not Found', httpStatus.NOT_FOUND);
    utilities.errorResponse(response, apiError);
  };
};

export const globalCors = (): ReturnType<typeof cors> => {
  return cors({
    origin: (origin, callbackFn) => {
      const isLocalhost = origin === '';
      if (!isLocalhost && AppWhiteListedDomains.includes(origin!)) {
        callbackFn(null, true);
      } else {
        callbackFn(new ApiError(`${origin!} is not a whitelisted domain`, 400));
      }
    }
  });
};
