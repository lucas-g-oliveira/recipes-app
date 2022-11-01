import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa a página de Profile', () => {
  it('Verifica se O formulário só fica válido após um email válido e uma senha de mais de 6 caracteres', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');

    expect(btnSubmit).toBeEnabled();

    userEvent.click(btnSubmit);

    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    history.push('/meals');

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);
  });
});
