import React, { useContext, useState } from 'react';
import RecipiesContext from '../context/RecipiesContext';

function Login() {
  const { email, setEmail } = useContext(RecipiesContext);

  const [password, setPassword] = useState('');

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const formValidation = () => {
    const validEmail = email.includes('@') && email.includes('.com');
    const seven = 7;
    return !!(!validEmail || password.length < seven);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ handleEmail }
        />
        <input
          type="text"
          placeholder="Password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ handlePassword }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ formValidation() }
          onClick={ handleClick }
          className="button"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
