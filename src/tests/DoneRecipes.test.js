import React from 'react';
// import { screen } from "@testing-library/react";
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Verifica a cobertura de testes em "DoneRecipies"', () => {
  it('Verifica se o componente gerérico redenriza as refeiçoes feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
  });

  it('Verifica se o componente gerérico redenriza as bebidas feitas', () => {});
});
