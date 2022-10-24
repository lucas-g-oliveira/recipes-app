import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Testa o componente Header', () => {
  it('verifica se os ícones sao renderizados corretamente', () => {
    renderWithRouter(<Meals />)
    const profileIcon = screen.getByRole('img', {  name: /profile/i});
    const searchIcon = screen.getByRole('img', {  name: /seacrh/i});
    const pageName = screen.getByTestId('page-title');
    
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageName).toBeInTheDocument();
    
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    
  })
})