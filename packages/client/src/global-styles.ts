import IndieFlowerRegular from './assets/fonts/indieflower-regular.ttf';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Indie Flower";
    src: url(${IndieFlowerRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  body, button, input, h2, h3 {
    font-family: "Indie Flower";
    padding: 0;
    margin: 0;
  }

  body {
    background-color: #f2f2f2;
  }
`;

export default GlobalStyle;
