export interface RecipeIngredientPurchasePriceUpdate {
  purchaseAmount?: number
  purchasePrice?: number
}

export interface RecipeIngredient {
  purchaseAmount: number
  purchasePrice: number
  recipeAmount: number
  name: string
}

export type RecipeIngredientAmount = Omit<
RecipeIngredient, 'purchasePrice' | 'purchaseAmount'
>;

export type RecipeIngredientPrice = Omit<
RecipeIngredient, 'recipeAmount'
>;
