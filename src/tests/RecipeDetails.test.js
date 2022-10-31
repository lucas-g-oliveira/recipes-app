import React from 'react';
import userEvent from '@testing-library/user-event';
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
    expect(await screen.findByTestId('0-recommendation-title')).toBeInTheDocument();
    expect(await screen.findByTestId('1-recommendation-title')).toBeInTheDocument();
    expect(await screen.findByTestId('2-recommendation-title')).toBeInTheDocument();
  });
  it('Verifica se o componente renderiza os detalhes de uma bebida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('drinks/15997');
    expect(await screen.findByRole('img', { name: /recipe/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /share/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /favorite/i })).toBeInTheDocument();
    expect(await screen.findByTestId('0-recommendation-title')).toBeInTheDocument();
    expect(await screen.findByTestId('1-recommendation-title')).toBeInTheDocument();
    expect(await screen.findByTestId('2-recommendation-title')).toBeInTheDocument();
    const btnStartRecipe = await screen.findByRole('button', { name: /start recipe/i });
    expect(btnStartRecipe).toBeInTheDocument();
    userEvent.click(btnStartRecipe);
  });
});
