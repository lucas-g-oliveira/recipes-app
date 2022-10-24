import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipiesContext from './RecipiesContext';

function ContextProvider({ children }) {
  const [email, setEmail] = useState('');

  const contextValue = { email, setEmail };

  return (
    <RecipiesContext.Provider value={ contextValue }>
      {children}
    </RecipiesContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
