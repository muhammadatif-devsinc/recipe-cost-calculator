import { type RecipeType } from '@rcc/shared';
import { type Recipe } from '../../database';

export const toRecipeType = (recipe: Recipe): RecipeType => {
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
