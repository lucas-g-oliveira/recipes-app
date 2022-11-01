import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa a página de Profile', () => {
  const emailId = 'email-input';
  const passId = 'password-input';
  const loginId = 'login-submit-btn';
  const emailTest = 'test@test.com';
  const passTest = '1234567';
  const idProfile = 'profile-top-btn';
  it('Verifica se a página de profile tem os elementos corretos', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passId);
    const btnSubmit = screen.getByTestId(loginId);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(email, emailTest);
    userEvent.type(password, passTest);

    expect(btnSubmit).toBeEnabled();

    userEvent.click(btnSubmit);

    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const profileBtn = screen.getByTestId(idProfile);
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);
    /* const textFavorite = screen.getByText(/favorite/i);
    expect(textFavorite).toBeInTheDocument(); */
  });
  it('Verifica se o botão done funciona', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passId);
    const btnSubmit = screen.getByTestId(loginId);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(email, emailTest);
    userEvent.type(password, passTest);

    expect(btnSubmit).toBeEnabled();

    userEvent.click(btnSubmit);

    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const profileBtn = screen.getByTestId(idProfile);
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();

    userEvent.click(doneBtn);
    /* act(() => history.push('/done-recipes')); */
    const { location } = history;
    expect(location.pathname).toBe('/done-recipes');
  });
  it('Verifica se o botão logout funciona', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passId);
    const btnSubmit = screen.getByTestId(loginId);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(email, emailTest);
    userEvent.type(password, passTest);

    expect(btnSubmit).toBeEnabled();

    userEvent.click(btnSubmit);

    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const profileBtn = screen.getByTestId(idProfile);
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
    /* act(() => history.push('/')); */
    const { location } = history;
    expect(location.pathname).toBe('/');
  });
});
