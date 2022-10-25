import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { saveEmail } from '../Services/userStorage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [next, setNext] = useState(false);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const minimo = 7;
    const verifyEmail = regex.test(email);
    if (password.length >= minimo && verifyEmail) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password]);

  const handleClick = () => {
    saveEmail(email);
    setNext(true);
  };

  return (
    next ? <Redirect
      to="/meals"
    /> : (
      <>
        <h1>Login</h1>
        Email :
        <input
          name="email"
          type="text"
          data-testid="email-input"
          value={ email }
          onChange={ (evento) => setEmail(evento.target.value) }
        />
        senha :
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (evento) => setPassword(evento.target.value) }
        />
        <button
          type="button"
          value="Enter"
          data-testid="login-submit-btn"
          disabled={ isDisable }
          onClick={ handleClick }
        >
          Enter
        </button>
      </>
    )
  );
}
