import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { saveDoneRecipe } from '../services/doneStorage';
import App from '../App';

const mockData = {
  meals: {
    53060: [
      'Filo Pastry',
      'Minced Beef',
    ],
  },
  drinks: {
    17222: [
      'Lemon Juice',
      'Gin',
      'Grand Marnier',
    ],
  },
};
const mockDoneRecipe = {
  id: 'id-da-receita',
  type: 'meal-ou-drink',
  nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'nome-da-receita',
  image: 'imagem-da-receita',
  doneDate: 'quando-a-receita-foi-concluida',
  tags: 'array-de-tags-da-receita-ou-array-vazio',
};

beforeEach(() => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(mockData));
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipe));
});

afterEach(() => {
  localStorage.removeItem('inProgressRecipes');
});

describe('Verifica receitas in progress', () => {
  const inprogressPage = '/meals/53060/in-progress';
  const drinkPathname = '/drinks/17222/in-progress';

  it('Verifica pathname da receita', () => {
    const { history } = renderWithRouter(<App />, [inprogressPage]);
    const { location: { pathname } } = history;
    expect(pathname).toBe(inprogressPage);
  });
  it('Verifica se o ingrediente é adicionado ou retirado do localStorage', async () => {
    /*  const { history } =  */
    renderWithRouter(<App />, [inprogressPage]);

    const ingredientMock = await screen.findByText(/minced beef/i);
    expect(ingredientMock).toBeInTheDocument();

    const newIngredient = await screen.findByTestId('4-ingredient-step');
    expect(newIngredient).toBeInTheDocument();

    userEvent.click(newIngredient);

    expect(newIngredient).toHaveClass('checked');

    userEvent.click(newIngredient);

    expect(newIngredient).not.toHaveClass('checked');
  });
  it('Verifica página de drinks', async () => {
    const { history, debug } = renderWithRouter(<App />, [drinkPathname]);
    const { location: { pathname } } = history;
    expect(pathname).toBe(drinkPathname);
    debug();
    const ingredientDrink = await screen.findAllByText(/grenadine/i);
    expect(ingredientDrink[0]).toBeInTheDocument();

    userEvent.click(ingredientDrink[0]);
    expect(ingredientDrink[0]).toHaveClass('checked');
    userEvent.click(ingredientDrink[0]);
    expect(ingredientDrink[0]).not.toHaveClass('checked');

    userEvent.click(ingredientDrink[0]);

    /*     const finishBtn = await screen.getByRole('heading', {
      name: /ingredients:/i,
    });

    expect(finishBtn).not.toBeDisabled();

    userEvent.click(finishBtn); */
  });
  it('Verifica página de drinks', async () => {
    const { history } = renderWithRouter(<App />, [drinkPathname]);

    const ingredientDrink = await screen.findAllByText(/grenadine/i);
    userEvent.click(ingredientDrink[0]);

    const finishBtn = await screen.findByRole('heading', {
      name: /ingredients:/i,
    });

    expect(finishBtn).not.toBeDisabled();

    userEvent.click(finishBtn);

    history.push('/done-recipes');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');

  /*   const doneRecipes = localStorage.getItem('doneRecipes');
    const done = JSON.parse(doneRecipes);

    expect(done).toEqual(mockDoneRecipe);

    const saveDone = saveDoneRecipe(mockDoneRecipe);
    expect(saveDone).toHaveBeenCalled(); */
  });
});
