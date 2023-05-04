import { AppDataSource, trasactions, Recipe } from '../../database';
import { successResponse } from '../../utilities';
import type { Request, Response } from 'express';
import { ApiError } from '../../ApiError';
import { type RecipeDTO } from './dtos';
import { toRecipeDTO } from './helpers';
import httpStatus from 'http-status';

export const getRecipe = async (req: Request, res: Response): Promise<void> => {
  const recipeName = req.params.recipeName;
  const recipeRepo = AppDataSource.getRepository(Recipe);
  const queryBuilder = recipeRepo.createQueryBuilder('recipe');
  const recipe = await queryBuilder
    .innerJoinAndSelect('recipe.recipeEntries', 'recipeEntry')
    .innerJoinAndSelect('recipeEntry.ingredient', 'ingredient')
    .where('recipe.recipeName = :recipeName', { recipeName })
    .getOne();

  if (recipe == null) {
    throw new ApiError(
    `No recipe found with name ${recipeName}`, httpStatus.NOT_FOUND
    );
  }

  const recipeDTO = toRecipeDTO(recipe);
  successResponse(res, recipeDTO, 200);
};

export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  const payload: RecipeDTO = req.body;
  const recipe = await trasactions.createRecipe(payload, true);
  const recipeDTO = toRecipeDTO(recipe);
  successResponse(res, recipeDTO, 201);
};
