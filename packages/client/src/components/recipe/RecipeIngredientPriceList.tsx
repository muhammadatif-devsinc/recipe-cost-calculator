import type { RecipeIngredientPrice, RecipeIngredientPurchasePriceUpdate } from './types';
import { StyledComponentProps } from '../../type-utils';
import { type ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const IngredientPriceListContainer = styled.div`
  margin: auto 25px auto 25px;
  flex-direction: column;
  min-height: 500px;
  display: flex;
  padding: 30px;
  width: 450px;
`;

const IngredientPriceListHeader = styled.div`
  font-weight: bold;
  display: flex;
`;

const HeaderColumn = styled.div<StyledComponentProps<
  'div', { flex: number; }
>>`
  flex: ${props => props.flex};
  text-align: center;
`;

const Table = styled.div`
  font-size: 1.2rem;
`;

const TableRow = styled.div`
  border-bottom: 2px solid #000;
  justify-content: center;
  padding-bottom: 10px;
  align-items: center;
  padding-top: 10px;
  display: flex;
`;

const TableColumnInput = styled.input`
  text-align: center;
  font-size: 1.2rem;
  max-width: 50px;
`;

const TableColumn = styled.div<StyledComponentProps<
  'div', { flex: number; justifyContent?: string }
>>`
  display: flex;
  flex: ${props => props.flex};
  justify-content: ${props => (
    props.justifyContent ? props.justifyContent : 'center'
  )};
`;

interface RecipeIngredientPriceListProps {
  priceList: RecipeIngredientPrice[];
  updateIngredientPrice: (
    name: string, 
    patch: RecipeIngredientPurchasePriceUpdate
  ) => void;
}

const initialState: RecipeIngredientPurchasePriceUpdate = {
  purchaseAmount: 0,
  purchasePrice: 0,
}

const RecipeIngredientPriceList = (props: RecipeIngredientPriceListProps): JSX.Element => {
  const [ingredientPricingUpdate, setIngredientPricingUpdate] = useState(initialState);
  const [ingredientNameWithFocus, setIngredientNameWithFocus] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getOnChangeHandlerFor = (ingredientName: string, propName: 'purchasePrice' | 'purchaseAmount') => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      if (ingredientName === ingredientNameWithFocus)  {
        const value = parseFloat(event.target.value);
        setIngredientPricingUpdate(currentState => ({
          ...currentState,
          [propName]: value
        }));
      }
    }
  }

  const getOnFocusHandlerFor = (ingredientName: string) => {
    return () => {
      const pricingInfo = props.priceList.find(
        ingredientPrice => ingredientPrice.name === ingredientName
      )!;
      
      const { purchaseAmount, purchasePrice } = pricingInfo;
      setIngredientPricingUpdate({ purchaseAmount, purchasePrice });
      setIngredientNameWithFocus(ingredientName);
      setIsEditing(true);
    }
  }

  const getOnBlurHandlerFor = (ingredientName: string) => {
    return () => {
      props.updateIngredientPrice(ingredientName, {
        purchaseAmount: ingredientPricingUpdate.purchaseAmount || 0,
        purchasePrice: ingredientPricingUpdate.purchasePrice || 0,
      });
      setIsEditing(false);
    }
  }

  const renderTableRow = (ingredientPrice: RecipeIngredientPrice) => {
    const isIngredientWithFocus = (
      isEditing && ingredientNameWithFocus === ingredientPrice.name
    );

    const amountInputValue = isIngredientWithFocus 
      ? ingredientPricingUpdate.purchaseAmount! 
      : ingredientPrice.purchaseAmount;

    const priceInputValue = isIngredientWithFocus
      ? ingredientPricingUpdate.purchasePrice! 
      : ingredientPrice.purchasePrice;

    return (
      <TableRow key={ingredientPrice.name}>
        <TableColumn 
          justifyContent='flex-start'
          flex={20}
        >
          {ingredientPrice.name}
        </TableColumn>
        <TableColumn flex={1}>$</TableColumn>
        <TableColumn flex={1} />
        <TableColumn flex={4}>
          <TableColumnInput 
            onChange={getOnChangeHandlerFor(ingredientPrice.name, 'purchasePrice')}
            onFocus={getOnFocusHandlerFor(ingredientPrice.name)}
            onBlur={getOnBlurHandlerFor(ingredientPrice.name)}
            value={String(priceInputValue)}
            type='number'
          /> 
        </TableColumn>
        <TableColumn flex={1} />
        <TableColumn flex={1}>per</TableColumn>
        <TableColumn flex={1} />
        <TableColumn flex={4}>
          <TableColumnInput 
            onChange={getOnChangeHandlerFor(ingredientPrice.name, 'purchaseAmount')}
            onFocus={getOnFocusHandlerFor(ingredientPrice.name)}
            onBlur={getOnBlurHandlerFor(ingredientPrice.name)}
            value={String(amountInputValue)}
            type='number'
          /> 
        </TableColumn>
        <TableColumn flex={1} />
        <TableColumn 
          justifyContent='flex-end'
          flex={3}
        >
          Oz
        </TableColumn>
      </TableRow>
    );
  }

  return (
    <IngredientPriceListContainer>
      {(props.priceList.length > 0) && (
        <IngredientPriceListHeader>
          <HeaderColumn flex={7} />
          <HeaderColumn flex={5}>
            Purchase Price
          </HeaderColumn>
          <HeaderColumn flex={5}>
            Purchase Amount
          </HeaderColumn>
        </IngredientPriceListHeader>
      )}
      <Table>{props.priceList.map(renderTableRow)}</Table>
    </IngredientPriceListContainer>
  )
}

export default RecipeIngredientPriceList;