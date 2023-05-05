import RecipeIngredientAmountList from './RecipeIngredientAmountList';
import RecipeIngredientPriceList from './RecipeIngredientPriceList';
import { useMemo, useState, useEffect, Fragment } from 'react';
import * as apiService from '../../api-service';
import RecipeNameInput from './RecipeNameInput';
import * as utilities from '../../utilities';
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
  const [isFetchingRecipe, setIsFetchingRecipe] = useState(true);
  const [recipeName, setRecipeName] = useState<string>('');
  const [totalCost, setTotalCost] = useState(0);

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

  useEffect(() => {
    setTotalCost(utilities.calculateRecipeCost(recipeIngredients));
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
  };

  const fetchLastRecipe = async (): Promise<void> => {
    const [error, recipeType] = await apiService.getLastRecipe();
    if ((error !== null) || (recipeType === null)) {
      setIsFetchingRecipe(false);
      return;
    }

    const { recipeName, ingredients } = utilities.toRecipe(recipeType);
    setTotalCost(utilities.calculateRecipeCost(ingredients));
    setRecipeIngredients(ingredients);
    setRecipeName(recipeName);
    setTimeout(() => { setIsFetchingRecipe(false); }, 0);
  };

  useEffect(() => {
    void fetchLastRecipe();
  }, []);

  const saveRecipe = async (): Promise<void> => {
    const calculatedTotalCost = utilities.calculateRecipeCost(recipeIngredients);
    setTotalCost(calculatedTotalCost);
    const recipeType = utilities.toRecipeType(recipeName, recipeIngredients);
    await apiService.createOrSaveRecipe(recipeType);
  };

  return (
    <CostCalculatorContainer>
      {isFetchingRecipe ? (<h1>Loading ...</h1>) : (
        <Fragment>
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
              saveRecipe={saveRecipe}
              totalCost={totalCost}
            />
          </CostCalculatorIngredientsContainer>
        </Fragment>
      )}
    </CostCalculatorContainer>
  );
};

export default RecipeCostCalculator;
