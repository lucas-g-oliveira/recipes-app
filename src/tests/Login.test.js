import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa a página de Login', () => {
  it('Verifica se O formulário só fica válido após um email válido e uma senha de mais de 6 caracteres', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    const { pathname } = history.location;

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    expect(pathname).toBe('/');

    expect(btnSubmit).toBeEnabled();
    // expect(email).toHaveTextContent('test@test.com');
  });
});
