import { z } from 'zod';

export const recipeSchema = z.object({
  recipeName: z.string()
    .min(5)
    .max(30),

  ingredients: z.record(
    z.string()
      .min(5)
      .max(30),
    z.object({
      purchaseAmount: z.number().min(1),
      purchasePrice: z.number().min(1),
      recipeAmount: z.number().min(1)
    })
  )
});

export type RecipeType = z.infer<typeof recipeSchema>;
