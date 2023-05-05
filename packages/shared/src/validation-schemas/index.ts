import { type ZodIssue, type ZodObject } from 'zod';

export * from './recipe.schemas';

type ValidationResult = Promise<[boolean, Error | null]>

export const prepareZodErrorMessage = (issue: ZodIssue): string => {
  const property = issue.path.join('.');
  return `property ${property}: ${issue.message.toLowerCase()}`;
};

export const validateSchema = async (
  schema: ZodObject<any>, target: object
): ValidationResult => {
  const results = await schema.safeParseAsync(target);
  if (results.success) return [true, null];
  const message = prepareZodErrorMessage(results.error.issues[0]);
  return [false, new Error(message)];
};
