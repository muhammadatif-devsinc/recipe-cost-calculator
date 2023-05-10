import RecipNameInput from '../../../components/recipe/RecipeNameInput';
import { fireEvent, render, screen } from '@testing-library/react';
import * as constants from '../../../constants';

describe('RecipeNameInput', () => {
  let setRecipeName: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    setRecipeName = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly for provided props', () => {
    const initialRecipeName = 'initial-recipe-name';
    render(
      <RecipNameInput
        recipeName={initialRecipeName}
        setRecipeName={setRecipeName}
      />
    );
    const placeholder = constants.DefaultRecipeName;
    const inputElement: HTMLInputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeTruthy();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.placeholder).toBe(placeholder);
  });

  it('should sync input value with recipeName if recipeName prop changes', () => {
    const initialRecipeName = 'initial-recipe-name';
    const wrapper = render(
      <RecipNameInput
        recipeName={initialRecipeName}
        setRecipeName={setRecipeName}
      />
    );
    const updatedRecipeName = 'updated-recipe-name';
    wrapper.rerender(
      <RecipNameInput
        recipeName={updatedRecipeName}
        setRecipeName={setRecipeName}
      />
    );
    const inputRecipeElement: HTMLInputElement = screen.getByRole('textbox');
    expect(inputRecipeElement.value).toBe(updatedRecipeName);
  });

  it('should call setRecipeName prop when a new recipeName is submitted', () => {
    const initialRecipeName = 'initial-recipe-name';
    render(
      <RecipNameInput
        recipeName={initialRecipeName}
        setRecipeName={setRecipeName}
      />
    );
    const submitRecipeNameButton = screen.getByRole('button');
    fireEvent.click(submitRecipeNameButton);

    const inputRecipeElement = screen.getByRole('textbox');
    const updatedRecipeName = 'updated-recipe-name';
    fireEvent.change(inputRecipeElement, { target: { value: updatedRecipeName } });
    fireEvent.click(submitRecipeNameButton);
    expect(setRecipeName).toHaveBeenCalledTimes(1);
    expect(setRecipeName).toHaveBeenCalledWith(updatedRecipeName);
  });

  it('should alternate button icons when editing mode is changed', () => {
    const initialRecipeName = 'initial-recipe-name';
    render(
      <RecipNameInput
        recipeName={initialRecipeName}
        setRecipeName={setRecipeName}
      />
    );
    const submitRecipeNameButton = screen.getByRole('button');
    const [editingIcon] = Array.from(submitRecipeNameButton.children);
    expect(editingIcon).toBeTruthy();
    fireEvent.click(submitRecipeNameButton);
    expect(editingIcon).not.toBeInTheDocument();

    const [completeIcon] = Array.from(submitRecipeNameButton.children);
    expect(completeIcon).toBeTruthy();
    fireEvent.click(submitRecipeNameButton);
    expect(completeIcon).not.toBeInTheDocument();
    expect(completeIcon.innerHTML).not.toBe(editingIcon.innerHTML);
  });
});
