import RecipeIngredientPriceList from '../../../components/recipe/RecipeIngredientPriceList';
import { fireEvent, waitFor, render, screen, act } from '@testing-library/react';
import { type RecipeIngredient } from '../../../components/recipe/types';
import { calculateRecipeCost } from '../../../utilities';

describe('RecipeIngredientPriceList', () => {
  let initialRecipeIngredients: RecipeIngredient[];
  let updateIngredientPrice: ReturnType<typeof jest.fn>;
  let saveRecipe: () => Promise<void>;

  beforeEach(() => {
    saveRecipe = jest.fn(async () => { await Promise.resolve(); });
    updateIngredientPrice = jest.fn();
    initialRecipeIngredients = [
      { 
        name: 'test-lettuce', 
        purchaseAmount: 22.45, 
        purchasePrice: 34.5, 
        recipeAmount: 12 
      },
      { 
        name: 'test-tomato', 
        purchaseAmount: 43.21, 
        purchasePrice: 81.6, 
        recipeAmount: 23 
      },
      { 
        name: 'test-potato', 
        purchaseAmount: 22.1, 
        purchasePrice: 54.2, 
        recipeAmount: 13 
      }
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly for provided props', () => {
    render(
      <RecipeIngredientPriceList
        updateIngredientPrice={updateIngredientPrice}
        saveRecipe={saveRecipe}
        priceList={[]}
        totalCost={0}
      />
    );
    const footerCostTitle = screen.getByText('Recipe Cost');
    expect(footerCostTitle).toBeTruthy();
    expect(footerCostTitle).toBeInTheDocument();

    const footerSaveRecipeButton = screen.getByRole('button');
    expect(footerSaveRecipeButton).toBeTruthy();
    expect(footerSaveRecipeButton).toBeInTheDocument();

    const footerDefaultPrice = screen.getByText('$#.###');
    expect(footerDefaultPrice).toBeTruthy();
    expect(footerDefaultPrice).toBeInTheDocument();
  });

  it('should call saveRecipe prop when save button is clicked', async () => {
    render(
      <RecipeIngredientPriceList
        totalCost={calculateRecipeCost(initialRecipeIngredients)}
        updateIngredientPrice={updateIngredientPrice}
        priceList={initialRecipeIngredients}
        saveRecipe={saveRecipe}
      />
    );
    const saveButton = screen.getByRole('button');
    await act(() => fireEvent.click(saveButton));
    expect(saveRecipe).toHaveBeenCalledTimes(1);
    expect(saveRecipe).toHaveBeenCalled();
  });

  it('should remove header when last recipe ingredient price entry is removed', () => {
    const [recipeIngredient]: RecipeIngredient[] = initialRecipeIngredients;
    const wrapper = render(
      <RecipeIngredientPriceList
        totalCost={calculateRecipeCost([recipeIngredient])}
        updateIngredientPrice={updateIngredientPrice}
        priceList={[recipeIngredient]}
        saveRecipe={saveRecipe}
      />
    );
    const headerColumnElement = screen.getByText('Purchase Price');
    const { parentElement: headerElement } = headerColumnElement;
    wrapper.rerender(
      <RecipeIngredientPriceList
        updateIngredientPrice={updateIngredientPrice}
        totalCost={calculateRecipeCost([])}
        saveRecipe={saveRecipe}
        priceList={[]}
      />
    );
    expect(headerElement).not.toBeInTheDocument();
  });

  it('should change text for save recipe button when said button is clicked', async () => {
    render(
      <RecipeIngredientPriceList
        totalCost={calculateRecipeCost(initialRecipeIngredients)}
        updateIngredientPrice={updateIngredientPrice}
        priceList={initialRecipeIngredients}
        saveRecipe={saveRecipe}
      />
    );
    const saveButton = screen.getByRole('button');
    fireEvent.click(saveButton);
    await waitFor(() => expect(saveButton.textContent).toBe('Saving ...'));
  });

  it('should call updatedIngredientPrice prop with correct arguments after updating prices', () => {
    render(
      <RecipeIngredientPriceList
        totalCost={calculateRecipeCost(initialRecipeIngredients)}
        updateIngredientPrice={updateIngredientPrice}
        priceList={initialRecipeIngredients}
        saveRecipe={saveRecipe}
      />
    );
    const [recipeIngredient] = initialRecipeIngredients;
    const [newPurchasePrice, newPurchaseAmount] = [32.43, 45.45];
    const [purchasePriceInput, purchaseAmountInput] = screen.getAllByRole('spinbutton');

    fireEvent.focus(purchaseAmountInput);
    fireEvent.change(purchaseAmountInput, { target: { value: newPurchaseAmount } });
    fireEvent.blur(purchasePriceInput);
    expect(updateIngredientPrice).toHaveBeenCalledTimes(1);
    expect(updateIngredientPrice).toHaveBeenCalledWith(recipeIngredient.name, {
      purchasePrice: recipeIngredient.purchasePrice,
      purchaseAmount: newPurchaseAmount
    });

    fireEvent.focus(purchasePriceInput);
    fireEvent.change(purchasePriceInput, { target: { value: newPurchasePrice } });
    fireEvent.blur(purchaseAmountInput);
    expect(updateIngredientPrice).toHaveBeenCalledTimes(2);
    expect(updateIngredientPrice).toHaveBeenCalledWith(recipeIngredient.name, {
      purchasePrice: recipeIngredient.purchasePrice,
      purchaseAmount: newPurchaseAmount
    });
  });
});
