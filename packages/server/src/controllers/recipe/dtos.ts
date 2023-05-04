export class RecipeDTO {
  recipeName!: string;
  ingredients!: Record<string, {
    purchaseAmount: number
    purchasePrice: number
    recipeAmount: number
  }>;
};
