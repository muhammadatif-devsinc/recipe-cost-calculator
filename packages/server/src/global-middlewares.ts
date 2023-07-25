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

export const globalSlow = () => {
  return async (_: Request, __: Response, next: NextFn) => {
    const delay = Math.round(Math.random() * 1000);
    await new Promise(resolve => setTimeout(resolve, delay));
    next();
  };
};

export const globalCors = (): ReturnType<typeof cors> => {
  return cors({
    origin: (origin, callbackFn) => {
      const isLocalhost = origin === undefined;
      if (!isLocalhost && AppWhiteListedDomains.includes(origin)) {
        callbackFn(null, true);
      } else {
        const domain = isLocalhost ? 'localhost' : origin;
        callbackFn(new ApiError(`${domain} is not a whitelisted domain`, 400));
      }
    }
  });
};
