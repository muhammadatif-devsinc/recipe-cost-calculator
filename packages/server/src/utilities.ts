import type { NextFunction as NextFn, Request, Response } from 'express';
import { type ApiError } from './ApiError';
import { type HttpStatus } from './types';
import { AppServerPort } from './config';
import type http from 'http';

export const withRouteErrorHandler = (
  routeHandlerFn: (req: Request, res: Response) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFn) => {
    routeHandlerFn(req, res).catch(error => { next(error); });
  };
};

export const errorResponse = (res: Response, error: ApiError): void => {
  res.status(error.statusCode as number);
  res.send(error.toJSON());
};

export const successResponse = (
  res: Response, payload: unknown, statusCode?: HttpStatus
): void => {
  res.status(statusCode as number);
  res.send(payload);
};

export const attachServerCallbacks = (server: http.Server): void => {
  server.on('listening', () => {
    const message = `listening to server on PORT ${AppServerPort}`;
    console.log(message);
  });

  server.on('error', error => {
    const message = 'closing server owing to error';
    console.log(message, error.message);
    server.close();
  });
};
