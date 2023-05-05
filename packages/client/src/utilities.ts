import { type RecipeIngredient } from './components/recipe/types';
import { type RecipeType } from '@rcc/shared';

export const toRecipeType = (
  recipeName: string,
  ingredients: RecipeIngredient[]
): RecipeType => {
  const ingredientsRecord = ingredients.reduce(
    (result, ingredient) => ({
      ...result, [ingredient.name]: ingredient
    }), {}
  );
  return { ingredients: ingredientsRecord, recipeName };
};

export const toRecipe = (recipe: RecipeType): {
  ingredients: RecipeIngredient[]
  recipeName: string
} => {
  const { recipeName } = recipe;
  const ingredients = Object.entries(recipe.ingredients).map(
    ([name, ingredient]) => ({ ...ingredient, name })
  );
  return { recipeName, ingredients };
};

export const calculateRecipeCost = (
  ingredients: RecipeIngredient[]
) => {
  return ingredients.reduce((costSum, ingredient) => {
    const { purchaseAmount, purchasePrice, recipeAmount } = ingredient;
    if (purchaseAmount === 0) return costSum;
    const unitCost = purchasePrice / purchaseAmount;
    return costSum + (recipeAmount * unitCost);
  }, 0);
};
