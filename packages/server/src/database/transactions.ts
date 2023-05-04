import { Recipe, RecipeEntry, Ingredient } from './entities';
import { type RecipeDTO } from '../controllers';
import { AppDataSource } from './data-source';

export const createRecipe = async (payload: RecipeDTO, clearTables: boolean = false): Promise<Recipe> => {
  return await AppDataSource.manager.transaction(async (manager) => {
    const recipeEntryRepo = manager.getRepository(RecipeEntry);
    const ingredientRepo = manager.getRepository(Ingredient);
    const recipeRepo = manager.getRepository(Recipe);

    if (clearTables) {
      await recipeEntryRepo.delete({});
      await Promise.all([ingredientRepo.delete({}), recipeRepo.delete({})]);
    }

    const recipe = recipeRepo.create({ recipeName: payload.recipeName });
    await recipeRepo.save(recipe);

    const ingredients = await Promise.all(
      Object.keys(payload.ingredients)
        .map(name => {
          const value = payload.ingredients[name];
          const ingredient = new Ingredient();
          ingredient.purchaseAmount = value.purchaseAmount;
          ingredient.purchasePrice = value.purchasePrice;
          ingredient.ingredientName = name;
          return ingredientRepo.create(ingredient);
        })
        .map(async ingredient => await ingredientRepo.save(ingredient))
    );

    const recipeEntries = await Promise.all(
      ingredients
        .map(ingredient => {
          const recipeEntry = new RecipeEntry();
          const { recipeAmount } = payload.ingredients[ingredient.ingredientName];
          recipeEntry.recipeAmount = recipeAmount;
          recipeEntry.ingredient = ingredient;
          recipeEntry.parentRecipe = recipe;
          return recipeEntryRepo.create(recipeEntry);
        })
        .map(async recipeEntry => await recipeEntryRepo.save(recipeEntry))
    );

    recipe.recipeEntries = recipeEntries;
    return await recipeRepo.save(recipe);
  });
};
