import RecipeIngredientAmountList from './RecipeIngredientAmountList';
import RecipeIngredientPriceList from './RecipeIngredientPriceList';
import RecipeNameInput from './RecipeNameInput';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import type { 
  RecipeIngredientPurchasePriceUpdate, 
  RecipeIngredientAmount, 
  RecipeIngredientPrice,
  RecipeIngredient, 
} from './types';

const CostCalculatorContainer = styled.div`
  padding: 100px 50px 100px 50px;
  background-color: #ffffff;
  flex-direction: column;
  border-radius: 20px;
  align-items: center;  
  display: flex;
`;

const CostCalculatorIngredientsContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const RecipeCostCalculator = (): JSX.Element => {
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  const [recipeName, setRecipeName] = useState<string>('');

  const [recipeAmountList, recipePriceList] = useMemo(() => {
    const amountList = recipeIngredients.map<RecipeIngredientAmount>(
      ingredient => ({ 
        recipeAmount: ingredient.recipeAmount,
        name: ingredient.name,
      })
    );

    const priceList = recipeIngredients.map<RecipeIngredientPrice>(
      ingredient => ({ 
        purchaseAmount: ingredient.purchaseAmount,
        purchasePrice: ingredient.purchasePrice,
        name: ingredient.name,
      })
    );

    return [amountList, priceList];
  }, [recipeIngredients]);

  const addIngredient = (name: string, amount: number): void => {
    setRecipeIngredients(currentState => ([
      ...currentState,
      { 
        recipeAmount: amount, 
        purchaseAmount: 0, 
        purchasePrice: 0, 
        name, 
      }
    ]));
  }

  const removeIngredient = (name: string): void => {
    setRecipeIngredients(currentState => (
      currentState.filter(
        currentIngredient => currentIngredient.name !== name
      )
    ));
  }

  const updateIngredientPurchasePriceInfo = (
    name: string, payload: RecipeIngredientPurchasePriceUpdate
  ): void => {
    setRecipeIngredients(currentState => {
      const targetIndex = currentState.findIndex(
        recipeIngredient => recipeIngredient.name === name
      );
      return [
        ...currentState.slice(0, targetIndex),
        { 
          ...currentState[targetIndex], 
          ...payload,
        },
        ...currentState.slice(targetIndex + 1)
      ];
    });
  }

  return (
    <CostCalculatorContainer>
      <RecipeNameInput
        setRecipeName={setRecipeName}
        recipeName={recipeName}
      />
      <CostCalculatorIngredientsContainer> 
        <RecipeIngredientAmountList 
          removeIngredient={removeIngredient}
          addIngredient={addIngredient}
          amountList={recipeAmountList}
        />
        <RecipeIngredientPriceList 
          updateIngredientPrice={updateIngredientPurchasePriceInfo}
          priceList={recipePriceList}
        />
      </CostCalculatorIngredientsContainer>
    </CostCalculatorContainer>
  );
};

export default RecipeCostCalculator;
