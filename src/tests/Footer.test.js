import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Footer', () => {
  it('verifica se os ícones sao renderizados corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    userEvent.click(btnSubmit);

    act(() => { history.push('/meals'); });
    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals');

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');
    const footer = screen.getByTestId('footer');
    const tagFooter = screen.getByRole('footer');

    expect(tagFooter).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
});
