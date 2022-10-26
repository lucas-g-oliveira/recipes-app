import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Header', () => {
  it('verifica se os ícones sao renderizados corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');

    expect(btnSubmit).toBeEnabled();
    userEvent.click(btnSubmit);

    act(() => history.push('/meals'));

    const searchIcon = screen.getByTestId('search-top-btn');

    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    const ingredientOption = screen.getByTestId('ingredient-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');

    expect(searchBar).toBeInTheDocument();

    userEvent.type(searchBar, 'bread');
    userEvent.tab(ingredientOption);
    userEvent.click(btnSearch);
  });
});
