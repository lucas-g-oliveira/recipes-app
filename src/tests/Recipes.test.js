import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import drinks from '../../cypress/mocks/drinks';

describe('Testa o componente Recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.fn().mockClear();
  });
  it('Verifica renderizacao dos filtros por categoria', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    expect(email).toBeEnabled();

    userEvent.type(email, 'test@test.com');
    const password = screen.getByTestId('password-input');
    expect(password).toBeEnabled();

    userEvent.type(password, 'test@test.com');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    expect(btnSubmit).toBeEnabled();

    userEvent.click(btnSubmit);

    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    global.fetch = jest.fn(async () => ({ json: () => mealCategories }));

    const filterAll = screen.getByTestId('All-category-filter');
    const filterBeef = await screen.findByTestId('Beef-category-filter');
    const filterBreackFast = await screen.findByTestId('Breakfast-category-filter');
    const filterChicken = await screen.findByTestId('Chicken-category-filter');
    const filterDessert = await screen.findByTestId('Dessert-category-filter');
    const filterGoal = await screen.findByTestId('Goat-category-filter');

    expect(filterAll).toBeInTheDocument();
    expect(filterBeef).toBeInTheDocument();
    expect(filterBreackFast).toBeDefined();
    expect(filterChicken).toBeDefined();
    expect(filterDessert).toBeDefined();
    expect(filterGoal).toBeDefined();

    userEvent.click(filterBeef);

    global.fetch = jest.fn(async () => ({ json: () => beefMeals }));

    const firstRecipe = await screen.findByRole('img', { name: /corba/i });
    expect(firstRecipe).toBeInTheDocument();

    userEvent.click(firstRecipe);

    const btnDrinklFooter = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinklFooter).toBeInTheDocument();
  });

  it('Teste se recipes drink redenriza os filtros', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    global.fetch = jest.fn(async () => ({ json: () => drinkCategories }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    global.fetch = jest.fn(async () => ({ json: () => drinks }));
    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const secondCategorie = await screen.findByRole('button', { name: /cocktail/i });
    expect(secondCategorie).toBeInTheDocument();

    global.fetch = jest.fn(async () => ({ json: () => cocktailDrinks }));
    userEvent.click(secondCategorie);
    expect(await screen.findByRole('img', { name: /155 belmont/i })).toBeInTheDocument();

    global.fetch = jest.fn(async () => ({ json: () => drinks }));
    const resetFilter = await screen.findByRole('button', { name: /all/i });
    expect(resetFilter).toBeInTheDocument();
    userEvent.click(resetFilter);

    const recipe = await screen.findByRole('img', { name: /gg/i });
    expect(recipe).toBeInTheDocument();
  });
});
