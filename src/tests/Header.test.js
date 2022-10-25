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

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const profileIcon = screen.getByRole('img', { name: /profile/i });
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageName = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageName).toBeInTheDocument();

    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });
});
