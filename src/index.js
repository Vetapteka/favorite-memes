import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { COLOR_YELLOW_LIGHT } from './stylesVariables';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Comfortaa', sans-serif;
  &::selection{
    background-color: ${COLOR_YELLOW_LIGHT};
  }
}`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Global />
        <App />
    </React.StrictMode>
);
