import RecipeIngredientAmountList from '../../../components/recipe/RecipeIngredientAmountList';
import { type RecipeIngredientAmount } from '../../../components/recipe/types';
import { fireEvent, render, screen } from '@testing-library/react';

describe('RecipeIngredientAmountList', () => {
  let initialAmountList: RecipeIngredientAmount[];
  let removeIngredient: ReturnType<typeof jest.fn>;
  let addIngredient: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    removeIngredient = jest.fn();
    addIngredient = jest.fn();
    initialAmountList = [
      { 
        name: 'test-lettuce', 
        recipeAmount: 22.45 
      },
      { 
        name: 'test-tomato', 
        recipeAmount: 31.29 
      },
      { 
        name: 'test-potato', 
        recipeAmount: 11.46 
      }
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly for provided props', () => {
    render(
      <RecipeIngredientAmountList
        removeIngredient={removeIngredient}
        addIngredient={addIngredient}
        amountList={[]}
      />
    );
    const addNewIngredientButton = screen.getByRole('button');
    expect(addNewIngredientButton).toBeTruthy();
    expect(addNewIngredientButton).toBeInTheDocument();
  });

  it('should call addIngredient prop with correct arguments when submitting new amount', () => {
    render(
      <RecipeIngredientAmountList
        removeIngredient={removeIngredient}
        addIngredient={addIngredient}
        amountList={[]}
      />
    );
    const addNewIngredientButton = screen.getByRole('button');
    fireEvent.click(addNewIngredientButton);

    const [newName, newAmount] = ['test-lettuce', 22.45];
    const amountInput = screen.getByRole('spinbutton');
    const nameInput = screen.getByRole('textbox');
    fireEvent.change(amountInput, { target: { value: newAmount } });
    fireEvent.change(nameInput, { target: { value: newName } });
    fireEvent.click(addNewIngredientButton);

    expect(addIngredient).toHaveBeenCalledTimes(1);
    expect(addIngredient).toHaveBeenCalledWith(newName, newAmount);
  });

  it('should call removeIngredient prop with correct arguments when removing ingredient amount', () => {
    render(
      <RecipeIngredientAmountList
        removeIngredient={removeIngredient}
        addIngredient={addIngredient}
        amountList={initialAmountList}
      />
    );
    const [_, deleteIngredientButton] = screen.getAllByRole('button');
    const { name: ingredientName } = initialAmountList[1];
    fireEvent.click(deleteIngredientButton);

    expect(removeIngredient).toHaveBeenCalledTimes(1);
    expect(removeIngredient).toHaveBeenCalledWith(ingredientName);
  });

  it('should remove header from component when ingredient amount list becomes empty', () => {
    const wrapper = render(
      <RecipeIngredientAmountList
        amountList={initialAmountList.slice(0, 1)}
        removeIngredient={removeIngredient}
        addIngredient={addIngredient}
      />
    );
    const headerColumnElement = screen.getByText('Amount');
    const { parentElement: headerElement } = headerColumnElement;
    wrapper.rerender(
      <RecipeIngredientAmountList
        removeIngredient={removeIngredient}
        addIngredient={addIngredient}
        amountList={[]}
      />
    );
    expect(headerElement).not.toBeInTheDocument();
  });
});
