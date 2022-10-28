import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
// import Meals from '../pages/Meals';
// import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';

describe('Testa o componente Recipes', () => {
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

    act(() => history.push('/meals'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));

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

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    }));

    const firstRecipe = await screen.findByRole('img', { name: /corba/i });
    expect(firstRecipe).toBeInTheDocument();
  });
});
