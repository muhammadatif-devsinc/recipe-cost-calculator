import { AppDataSource, initializeAppDataSource } from './data-source';
import { Recipe } from './entities';
import { createRecipe } from './transactions';
import type { RecipeType } from '@rcc/shared';

const recipe: RecipeType = {
  recipeName: 'Spaghetti Bolonese',
  ingredients: {
    Lettuce: {
      purchasePrice: 2.33,
      purchaseAmount: 22,
      recipeAmount: 12
    },
    Tomatoes: {
      purchasePrice: 4.20,
      purchaseAmount: 12,
      recipeAmount: 32
    },
    'Green Onions': {
      purchasePrice: 3.87,
      purchaseAmount: 44,
      recipeAmount: 21
    },
    Spaghetti: {
      purchasePrice: 4.55,
      purchaseAmount: 23,
      recipeAmount: 300
    },
    'Tomato Sauce': {
      purchasePrice: 3.12,
      purchaseAmount: 23,
      recipeAmount: 36
    },
    Oregano: {
      purchasePrice: 5.20,
      purchaseAmount: 22,
      recipeAmount: 43
    },
    'Parmesan Cheese': {
      purchasePrice: 6.19,
      purchaseAmount: 21,
      recipeAmount: 23
    }
  }
};

const getRecipeCount = async (): Promise<number> => {
  const recipeRepo = AppDataSource.getRepository(Recipe);
  return await recipeRepo.count();
};

const seedDatabase = async (): Promise<void> => {
  let recipeExists: boolean = false;

  try {
    await initializeAppDataSource();
    recipeExists = (await getRecipeCount()) > 0;
    if (!recipeExists) await createRecipe(recipe, true);
  } catch (error) {
    console.error(error);
  } finally {
    const message = recipeExists
      ? 'A Recipe already exists aborting seeding operation !'
      : 'Created new recipe since none exists currently !';

    console.log(message);
  }
};

void seedDatabase();
