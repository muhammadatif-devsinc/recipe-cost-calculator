import { AppDataSource, trasactions, Recipe } from '../../database';
import { successResponse } from '../../utilities';
import type { Request, Response } from 'express';
import { ApiError } from '../../ApiError';
import { toRecipeType } from './helpers';
import { type RecipeType } from '@rcc/shared';
import httpStatus from 'http-status';

export const getLastRecipe = async (req: Request, res: Response): Promise<void> => {
  const recipeRepo = AppDataSource.getRepository(Recipe);
  const queryBuilder = recipeRepo.createQueryBuilder('recipe');
  const recipe = await queryBuilder
    .innerJoinAndSelect('recipe.recipeEntries', 'recipeEntry')
    .innerJoinAndSelect('recipeEntry.ingredient', 'ingredient')
    .getOne();

  if (recipe == null) {
    throw new ApiError('No recipe found with name', httpStatus.NOT_FOUND);
  }

  const recipeDTO = toRecipeType(recipe);
  successResponse(res, recipeDTO, 200);
};

export const createOrSaveRecipe = async (req: Request, res: Response): Promise<void> => {
  const payload: RecipeType = req.body;
  const recipe = await trasactions.createRecipe(payload, true);
  const recipeDTO = toRecipeType(recipe);
  successResponse(res, recipeDTO, 201);
};
