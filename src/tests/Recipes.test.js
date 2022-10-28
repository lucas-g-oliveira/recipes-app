import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
// import Meals from '../pages/Meals';
// import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Testa o componente Recipes', () => {
  it('Verifica renderizacao dos filtros por categoria', async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(mealCategories),
    // }));
    /* await act(async () => { renderWithRouter(<App />); }); */
    const { history } = renderWithRouter(<App />);

    // const email = screen.getByTestId('email-input');
    // const password = screen.getByTestId('password-input');
    // const btnSubmit = screen.getByTestId('login-submit-btn');

    // userEvent.type(email, 'test@test.com');
    // userEvent.type(password, '1234567');

    // expect(btnSubmit).toBeEnabled();
    // userEvent.click(btnSubmit);

    // await act(async () => history.push('/meals'));
    // const { location: { pathname } } = history;

    // const filterBeef = screen.findByTestId('Beef-category-filter');
    /*  const filterBreackFast = screen.findByTestId('Breakfast-category-filter');
    const filterChicken = screen.findByTestId('Chicken-category-filter');
    const filterDessert = screen.findByTestId('Dessert-category-filter');
    const filterGoal = screen.findByTestId('Goat-category-filter');
    const filterAll = screen.findByTestId('All-category-filter');

    expect(filterBeef).toBeDefined();
    expect(filterBreackFast).toBeDefined();
    expect(filterChicken).toBeDefined();
    expect(filterDessert).toBeDefined();
    expect(filterGoal).toBeDefined();
    expect(filterAll).toBeDefined();

    userEvent.click(filterBeef);

    const firstRecipe = screen.findByTestId('0-card-name');
    expect(firstRecipe).toHaveTextContent(/beef and mustard pie/i); */
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

    /* it('mock setTimeout test', () => {
      jest.useFakeTimers();
      setTimeout(() => {
        expect(component.state().fruits).toEqual(fruits);
      }, 1500);
      jest.runAllTimers();
     }); */

    const filterBeef = await screen.findByTestId('Beef-category-filter');
    // console.log(filterBeef);
    expect(filterBeef).toBeInTheDocument();
    // expect(filterBeef).toBeInTheDocument();

    const filterAll = screen.getByTestId('All-category-filter');
    expect(filterAll).toBeInTheDocument();

    // global.fetch.mockClear();
  });

  /* // it.skip('Verifica renderizacao dos filtros por categoria na pagina', async () => {
  //   // global.fetch = jest.fn(() => Promise.resolve({
  //   //   json: () => Promise.resolve(mealCategories),
  //   // }));
  //   await act(async () => { renderWithRouter(<App />); });
  //   const { history } = renderWithRouter(<App />);
  //
  //   // const email = screen.getByTestId('email-input');
  //   // const password = screen.getByTestId('password-input');
  //   // const btnSubmit = screen.getByTestId('login-submit-btn');

  //   // userEvent.type(email, 'test@test.com');
  //   // userEvent.type(password, '1234567');

  //   // expect(btnSubmit).toBeEnabled();
  //   // userEvent.click(btnSubmit);

  //   // await act(async () => history.push('/meals'));
  //   // const { location: { pathname } } = history;

  //   // const filterBeef = screen.findByTestId('Beef-category-filter');
  //   const filterBreackFast = screen.findByTestId('Breakfast-category-filter');
  //   const filterChicken = screen.findByTestId('Chicken-category-filter');
  //   const filterDessert = screen.findByTestId('Dessert-category-filter');
  //   const filterGoal = screen.findByTestId('Goat-category-filter');
  //   const filterAll = screen.findByTestId('All-category-filter');

  //   expect(filterBeef).toBeDefined();
  //   expect(filterBreackFast).toBeDefined();
  //   expect(filterChicken).toBeDefined();
  //   expect(filterDessert).toBeDefined();
  //   expect(filterGoal).toBeDefined();
  //   expect(filterAll).toBeDefined();

  //   userEvent.click(filterBeef);

  //   const firstRecipe = screen.findByTestId('0-card-name');
  //   expect(firstRecipe).toHaveTextContent(/beef and mustard pie/i);
  //   const email = screen.getByTestId('email-input');
  //   expect(email).toBeEnabled();
  //   userEvent.type(email, 'test@test.com');

  //   const password = screen.getByTestId('password-input');
  //   expect(password).toBeEnabled();
  //   userEvent.type(password, 'test@test.com');

  //   const btnSubmit = screen.getByTestId('login-submit-btn');
  //   expect(btnSubmit).toBeEnabled();
  //   userEvent.click(btnSubmit);

  //   act(() => history.push('/drinks'));
  //   const { location: { pathname } } = history;
  //   expect(pathname).toBe('/drinks');

  //   // global.fetch = jest.fn(() => Promise.resolve({
  //   //   json: () => Promise.resolve(mealCategories),
  //   // }));

  //    it('mock setTimeout test', () => {
  //     jest.useFakeTimers();
  //     setTimeout(() => {
  //       expect(component.state().fruits).toEqual(fruits);
  //     }, 1500);
  //     jest.runAllTimers();
  //    });

  //   // const filterBeef = screen.getByTestId('Beef-category-filter');
  //   await waitForElement(() => expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument());
  //   // expect(filterBeef).toBeInTheDocument();

  //   const filterAll = screen.getByTestId('All-category-filter');
  //   expect(filterAll).toBeInTheDocument();

  //   global.fetch.mockClear();
  // });

  // it('teste', () => {
  //   renderWithRouter(<Meals option="meals" />);

  //   const filterAll = screen.getByTestId('All-category-filter');
  //   expect(filterAll).toBeInTheDocument();
  // }); */
});
