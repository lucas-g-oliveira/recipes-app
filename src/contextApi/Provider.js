import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchBtn, setSearchBtn] = useState(false);

  const showsearchBtn = useCallback(() => {
    console.log('clicou');
    setSearchBtn(!searchBtn);
  }, [searchBtn]);

  const context = useMemo(() => ({
    searchBtn,
    showsearchBtn,
  }), [searchBtn, showsearchBtn]);

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
