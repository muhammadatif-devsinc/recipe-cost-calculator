import { type Recipe } from '../../database';
import type { RecipeDTO } from './dtos';

export const toRecipeDTO = (recipe: Recipe): RecipeDTO => {
  const { recipeName } = recipe;
  const ingredients = recipe.recipeEntries
    .reduce((result, recipeEntry) => {
      const { recipeAmount } = recipeEntry;
      const {
        purchaseAmount,
        purchasePrice,
        ingredientName
      } = recipeEntry.ingredient;
      return {
        ...result,
        [ingredientName]: {
          purchaseAmount,
          purchasePrice,
          recipeAmount
        }
      };
    }, {});

  return { ingredients, recipeName };
};
