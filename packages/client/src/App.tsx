import RecipeCostCalculator from './components/recipe/RecipeCostCalculator';
import GlobalStyle from './global-styles';
import styled from 'styled-components';
import { Fragment } from 'react';

const AppContainer = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  display: flex;
  width: 100vw;
`;

const App = (): JSX.Element => (
  <Fragment>
    <GlobalStyle />
    <AppContainer>
      <RecipeCostCalculator />
    </AppContainer>
  </Fragment>
);

export default App;