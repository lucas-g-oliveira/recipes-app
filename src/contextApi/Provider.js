import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [stateTemp, setStateTemp] = useState();

  const context = useMemo(() => ({
    stateTemp,
    setStateTemp,
  }), [stateTemp]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes,
}.isRequired;

export default Provider;
