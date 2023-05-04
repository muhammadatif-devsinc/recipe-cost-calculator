import type { Response, Request, NextFunction as Next } from 'express';
import { recipeSchema, validateSchema } from '@rcc/shared';
import { ApiError } from '../../ApiError';

export const createRecipeValidator = () => {
  return async (req: Request, _: Response, next: Next) => {
    const [isValid, error] = await validateSchema(recipeSchema, req.body);
    if (isValid) { next(); return; }
    next(ApiError.fromError(error!, 400));
  };
};
