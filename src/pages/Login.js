import React from 'react';
import { Redirect } from 'react-router-dom';
import { saveEmail } from '../Services/userStorage';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    validarB: true,
    next: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minimo = 7;
    this.setState({
      [name]: value,
    }, () => {
      const { password, email } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const verifyEmail = regex.test(email);
      if (password.length >= minimo && verifyEmail) {
        this.setState({
          validarB: false,
        });
      } else {
        this.setState({
          validarB: true,
        });
      }
    });
  };

  handleClick = () => {
    const { email } = this.state;
    saveEmail(email);
    this.setState({
      next: true,
    });
  };

  render() {
    const { email, password, validarB, next } = this.state;
    return (
      next ? <Redirect
        to={ { pathname: '/meals' } }
      /> : (
        <>
          <h1>Login</h1>
          Email :
          <input
            name="email"
            type="text"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          senha :
          <input
            name="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            value="Enter"
            data-testid="login-submit-btn"
            disabled={ validarB }
            onClick={ this.handleClick }
          >
            Enter
          </button>
        </>
      )
    );
  }
}

export default Login;
