import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa se os elementos aparecem conforme o esperado em RecipeDetails', () => {
  it('Verifica se os componentes redenrizam os detalhes de uma refeição', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('meals/52977');

    expect(await screen.findByRole('img', { name: /recipe/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /share/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /favorite/i })).toBeInTheDocument();
  });

  it('Verifica se o componente renderiza os detalhes de uma bebida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('drinks/15997');

    expect(await screen.findByRole('img', { name: /recipe/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /share/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /favorite/i })).toBeInTheDocument();
  });
});
