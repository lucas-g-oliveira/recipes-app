import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const mockData = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockData));
});

afterEach(() => {
  localStorage.removeItem('favoriteRecipes');
});

describe('Testa se receitas sao adicionadas na tela de favoritos', () => {
  const favoritePage = '/favorite-recipes';

  it('checa filtros por tipo de receita', () => {
    const { history } = renderWithRouter(<App />, ['/favorite-recipes']);
    const { location: { pathname } } = history;

    expect(pathname).toBe(favoritePage);

    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(2);
    
    const mealsFilterBtn = screen.getByRole('button', {  name: /meals/i});
    expect (mealsFilterBtn).toBeInTheDocument();
    
    userEvent.click(mealsFilterBtn);
    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(1);
    
    const mealRecipe = screen.getByRole('heading', {  name: /corba/i});
    expect(mealRecipe).toBeInTheDocument();
    
    const drinkFilterBtn = screen.getByRole('button', {  name: /drinks/i});
    expect(drinkFilterBtn).toBeInTheDocument();
    
    userEvent.click(drinkFilterBtn);
    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(1);
    
    const drinkRecipe = screen.getByRole('heading', {  name: /gg/i});
    expect(drinkRecipe).toBeInTheDocument();

    const allFilterBtn = screen.getByRole('button', {  name: /all/i})
    expect(allFilterBtn).toBeInTheDocument();
    
    userEvent.click(allFilterBtn);
    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(2);
  });
  
  it('testa botao de compartilhar e botao remover favorito', () => {
    const { history } = renderWithRouter(<App />, ['/favorite-recipes']);
    const { location: { pathname } } = history;
    expect(pathname).toBe(favoritePage);
    
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    // o click abaixo quebra o teste pq nao consegue exacutar a funcao copy da API clipboard
    // necessario fazer um mock.fn
    // userEvent.click(shareBtn);

    const removeFavoriteBtn = screen.getAllByRole('img', { name: /favorite/i });
    expect(removeFavoriteBtn).toHaveLength(2);
    userEvent.click(removeFavoriteBtn[0])

    expect(screen.getAllByAltText(/recipe/i)).toHaveLength(1);
  });
});
