import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RenderWithProvider from './RenderWithProvider';
import App from '../App';

describe('Testa o componente "Login"', () => {
  beforeEach(() => {
    act(() => {
      RenderWithProvider(<App />);
    });
  });
  it('Testa se a página contém os inputs necessários e se o botão começa desabilitado:', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();
  });

  it('Testa se o botão habilida quando satisfeitos os requisitos:', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'alguem@email.com');
    userEvent.type(passwordInput, '1234567');

    expect(enterBtn).not.toBeDisabled();
  });
});
