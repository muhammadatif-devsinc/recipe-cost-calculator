import type { StyledComponentProps } from '../../type-utils';
import { type ChangeEvent, Fragment, useState } from 'react';
import { TiDelete as RemoveIcon } from 'react-icons/ti';
import type { RecipeIngredientAmount } from './types';
import * as constants from '../../constants';
import styled from 'styled-components';

const IngredientAmountListContainer = styled.div`
  margin: auto 25px auto 25px;
  flex-direction: column;
  border: 2px solid #000;
  min-height: 500px;
  display: flex;
  padding: 30px;
  width: 450px;
`;

const IngredientAmountListHeader = styled.header`
  font-weight: bold;
  display: flex;
`;

const HeaderColumn = styled.div<StyledComponentProps<
  'div', { flex: number; }
>>`
  flex: ${props => props.flex};
`;

const IngredientAmountListFooter = styled.footer`
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  display: flex;
`;

const Table = styled.div`
  font-size: 1.2rem;
`;

const TableRow = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

const TableDataColumn = styled.div`
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  align-items: center;
  padding-top: 10px;
  display: flex;
  width: 80%;
`;

const DataColumn = styled.div<StyledComponentProps<
  'div', { flex: number; justifyContent?: string; }
>>`
  display: flex;
  flex: ${props => props.flex};
  justify-content: ${props => (
    props.justifyContent ? props.justifyContent : 'center'
  )};
`;

const DataColumnInput = styled.input<StyledComponentProps<
  'input', { textAlign: string; isEditing: boolean }
>>`
  text-align: ${props => props.textAlign};
  font-size: 1.2rem;
  width: 100%;

  &:focus {
    outline: none;
    border: ${props => (
      props.isEditing ? '2px solid #000' : '0px'
    )};
  }
`;

const TableButtonColumn = styled.div`
  justify-content: center;
  align-items: center;
  height: inherit;
  padding: 10px;
  display: flex;
  width: 20%;
`;

const RemoveIngredientButton = styled.button`
  justify-content: center;
  background: transparent;
  align-items: center;
  display: flex;
  border: none;
`;

const AddIngredientButton = styled.button`
  margin-right: 15%;
  font-size: 0.8rem;
  min-width: 100px;
  padding: 0.2rem;
`;

interface RecipeIngredientAmountListProps {
  amountList: RecipeIngredientAmount[];
  addIngredient: (name: string, amount: number) => void;
  removeIngredient: (name: string) => void;
}

const initialState: RecipeIngredientAmount = {
  recipeAmount: 0,
  name: ''
};

const RecipeIngredientAmountList = (
  props: RecipeIngredientAmountListProps
): JSX.Element => {
  const [newIngredient, setNewIngredient] = useState(initialState);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const getOnChangeHandlerFor = (propName: 'name' | 'recipeAmount') => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = propName === 'recipeAmount' 
        ? parseFloat(event.target.value) 
        : event.target.value;

      setNewIngredient(currentState => ({
        ...currentState,
        [propName]: value
      }));
    }
  }

  const handleNewButtonClick = () => {
    if (!isAddingNew) {
      setIsAddingNew(true);
    } else {
      /** 
       * TODO: replace this "else" condition with "else if" condition which
       * validates "name" and "newAmount"
       */
      props.addIngredient(newIngredient.name, newIngredient.recipeAmount || 0);
      setNewIngredient({ ...initialState });
      setIsAddingNew(false);
    }
  }

  const renderTableRow = (ingredientAmount: RecipeIngredientAmount) => (
    <TableRow key={ingredientAmount.name}>
      <TableDataColumn>
        <DataColumn 
          justifyContent='flex-start'
          flex={12} 
        >
          <span>{ingredientAmount.name}</span>
        </DataColumn>
        <DataColumn flex={1} />
        <DataColumn flex={4}>
          <span>{ingredientAmount.recipeAmount}</span>
        </DataColumn>
        <DataColumn flex={1} />
        <DataColumn 
          justifyContent='flex-end'
          flex={1} 
        >
          <span>Oz</span>
        </DataColumn>
        </TableDataColumn>
      <TableButtonColumn>
        {/** 
          * TODO: Replace button with shared styled button common to this
          * component and "RecipeIngredientPriceList" component
          */}
        <RemoveIngredientButton onClick={() => props.removeIngredient(ingredientAmount.name)}>
          <RemoveIcon size={constants.DefaultIconSize} />
        </RemoveIngredientButton>
      </TableButtonColumn>
    </TableRow>
  );

  const onNewIngredientRemoveClicked = () => {
    setNewIngredient({ ...initialState });
    setIsAddingNew(false)
  }

  const renderedNewIngredientRow = (
    <Fragment>
      {isAddingNew && (
        <TableRow key='newIngredientKey'>
          <TableDataColumn>
            <DataColumn 
              justifyContent='flex-start'
              flex={12} 
            >
              <DataColumnInput
                onChange={getOnChangeHandlerFor('name')}
                value={newIngredient.name}
                isEditing={isAddingNew}
                textAlign='left'
                type='text'
              />
            </DataColumn>
            <DataColumn flex={1} />
            <DataColumn flex={4}>
              <DataColumnInput
                onChange={getOnChangeHandlerFor('recipeAmount')}
                value={newIngredient.recipeAmount}
                isEditing={isAddingNew}
                textAlign='center'
                type='number'
              />
            </DataColumn>
            <DataColumn flex={1} />
            <DataColumn 
              justifyContent='flex-end'
              flex={1} 
            >
              Oz
            </DataColumn>
          </TableDataColumn>
          <TableButtonColumn>
            <RemoveIngredientButton onClick={onNewIngredientRemoveClicked}>
              <RemoveIcon size={constants.DefaultIconSize} />
            </RemoveIngredientButton>
          </TableButtonColumn>
        </TableRow>
      )}
    </Fragment>
  );

  return (
    <IngredientAmountListContainer>
      {(props.amountList.length > 0) && (
        <IngredientAmountListHeader>
          <HeaderColumn flex={5} />
          <HeaderColumn flex={4}>
            Amount
          </HeaderColumn>
        </IngredientAmountListHeader>
      )}
      <Table>
        {props.amountList.map(renderTableRow)}
        {renderedNewIngredientRow}
      </Table>
      <IngredientAmountListFooter>
       <AddIngredientButton onClick={handleNewButtonClick}>
         {isAddingNew ? 'Done' : 'New Ingredient'}
       </AddIngredientButton>
      </IngredientAmountListFooter>
    </IngredientAmountListContainer>
  );
}

export default RecipeIngredientAmountList;