import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const recipeTest = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(recipeTest));
});

afterEach(() => {
  localStorage.removeItem('doneRecipes');
});

const donePage = '/done-recipes';

describe('Verifica a cobertura de testes em "DoneRecipies"', () => {
  it('checa filtros por tipo de receita', () => {
    const { history } = renderWithRouter(<App />, [donePage]);
    const { location: { pathname } } = history;

    expect(pathname).toBe(donePage);

    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(2);

    const mealsFilterBtn = screen.getByRole('button', { name: /meals/i });
    expect(mealsFilterBtn).toBeInTheDocument();

    userEvent.click(mealsFilterBtn);
    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(1);

    const mealRecipe = screen.getByRole('heading', { name: /arrabiata/i });
    expect(mealRecipe).toBeInTheDocument();

    const drinkFilterBtn = screen.getByRole('button', { name: /drinks/i });
    expect(drinkFilterBtn).toBeInTheDocument();

    userEvent.click(drinkFilterBtn);
    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(1);

    const drinkRecipe = screen.getByRole('heading', { name: /aquamarine/i });
    expect(drinkRecipe).toBeInTheDocument();

    const allFilterBtn = screen.getByRole('button', { name: /all/i });
    expect(allFilterBtn).toBeInTheDocument();

    userEvent.click(allFilterBtn);
    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(2);
  });

  it('testa botao de compartilhar', () => {
    window.document.execCommand = jest.fn(() => true);
    const { history } = renderWithRouter(<App />, [donePage]);
    const { location: { pathname } } = history;
    expect(pathname).toBe(donePage);

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);

    const copyedText = screen.getByText(/link copied!/i);
    expect(copyedText).toBeInTheDocument();

    const copyedOkBtn = screen.getByRole('button', { name: /ok/i });
    expect(copyedOkBtn).toBeInTheDocument();

    userEvent.click(copyedOkBtn);
    expect(copyedText).not.toBeInTheDocument();
    expect(copyedOkBtn).not.toBeInTheDocument();
  });
});
