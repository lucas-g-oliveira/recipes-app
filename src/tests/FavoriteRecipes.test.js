import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa se receitas sao adicionadas na tela de favoritos', () => {

  const favoritePage = '/favorite-recipes';

  it('adiciona uma receita meal aos favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    // act(() => history.push('meals/52977'));
    history.push('/meals/52977');

    expect(await screen.findByRole('img', { name: /recipe/i })).toBeInTheDocument();

    const favoriteBtn = screen.getByRole('img', { name: /favorite/i });
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);

    // act(() => history.push('favorite-recipes'));
    history.push(favoritePage);
    const recipeTitle = screen.getByText(/corba/i);
    expect(recipeTitle).toBeInTheDocument();
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    const removeFavoriteBtn = screen.getByRole('img', { name: /favorite/i });
    expect(removeFavoriteBtn).toBeInTheDocument();

    const filterMeals = screen.getByRole('button', { name: /meals/i });
    expect(filterMeals).toBeInTheDocument();

    // userEvent.click(shareBtn);
    userEvent.click(removeFavoriteBtn);

    expect(recipeTitle).not.toBeInTheDocument();

    // const copyedText = screen.getByText(/link copied!/i);
    // expect(copyedText).toBeInTheDocument();
  });

  it('adiciona uma receita drink aos favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    // act(() => history.push('drinks/15997'));
    history.push('/drinks/15997');

    expect(await screen.findByRole('img', { name: /recipe/i })).toBeInTheDocument();

    const favoriteBtn = screen.getByRole('img', { name: /favorite/i });
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);

    // act(() => history.push('favorite-recipes'));
    history.push(favoritePage);
    const recipeTitle = await screen.findByText(/gg/i);
    expect(recipeTitle).toBeInTheDocument();
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    const removeFavoriteBtn = screen.getByRole('img', { name: /favorite/i });
    expect(removeFavoriteBtn).toBeInTheDocument();

    // userEvent.click(shareBtn);
    userEvent.click(removeFavoriteBtn);

    expect(recipeTitle).not.toBeInTheDocument();

    // const copyedText = screen.getByText(/link copied!/i);
    // expect(copyedText).toBeInTheDocument();
  });

  it('testa filtro das receitas em favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    // act(() => history.push('meals/52977'));
    history.push('/meals/52977');

    expect(await screen.findByRole('img', { name: /recipe/i })).toBeInTheDocument();

    const favoriteBtn1 = screen.getByRole('img', { name: /favorite/i });
    expect(favoriteBtn1).toBeInTheDocument();
    userEvent.click(favoriteBtn1);

    history.push('/drinks/15997');

    expect(await screen.findByRole('img', { name: /recipe/i })).toBeInTheDocument();

    const favoriteBtn2 = screen.getByRole('img', { name: /favorite/i });
    expect(favoriteBtn2).toBeInTheDocument();
    userEvent.click(favoriteBtn2);

    // act(() => history.push('favorite-recipes'));
    history.push(favoritePage);
    const recipeTitle = screen.getByText(/corba/i);
    expect(recipeTitle).toBeInTheDocument();
    // const shareBtn = await screen.findByTestId('1-horizontal-share-btn');
    const shareBtn = screen.findAllByRole('img', { name: /shareBtn/i });
    expect(shareBtn[0]).toBeInTheDocument();

    const removeFavoriteBtn = screen.getByRole('img', { name: /favorite/i });
    expect(removeFavoriteBtn).toBeInTheDocument();

    const filterMeals = screen.getByRole('button', { name: /meals/i });
    expect(filterMeals).toBeInTheDocument();

    // userEvent.click(shareBtn);
    userEvent.click(removeFavoriteBtn);

    expect(recipeTitle).not.toBeInTheDocument();

    // const copyedText = screen.getByText(/link copied!/i);
    // expect(copyedText).toBeInTheDocument();
  });
});
