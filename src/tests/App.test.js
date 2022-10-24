import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa a página de Login', () => {
  it('Verifica se O formulário só fica válido após um email válido e uma senha de mais de 6 caracteres', () => {
    /* const { history } = renderWithRouter(<App />); */
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    /* const { pathname } = history.location; */
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();
    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    /* expect(pathname).toBe('/'); */
    expect(btnSubmit).toBeEnabled();
    /* expect(email).toHaveContent('test@test.com'); */
  });
});
