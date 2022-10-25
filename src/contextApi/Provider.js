import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchBtn, setSearchBtn] = useState(false);
  const [searchByType, setSearchByType] = useState({
    valueToSearch: '',
    option: '',
  });

  const showsearchBtn = useCallback(() => {
    setSearchBtn(!searchBtn);
  }, [searchBtn]);

  const handleSearchChange = useCallback(({ target }) => {
    const { name, value } = target;
    // const { valueToSearch, option } = searchByType;
    setSearchByType({ ...searchByType, [name]: value });
    // if (option === 'primeiraLetra' && valueToSearch.length > 1) {
    //   global.alert('Your search must have only 1 (one) character');
    // }
  }, [searchByType]);

  const fetchMealsApi = useCallback(async () => {
    const { valueToSearch, option } = searchByType;
    const ingredientEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueToSearch}`;
    const nameEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valueToSearch}`;
    const firstLetterEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valueToSearch}`;

    let response;
    if (option === 'ingredientes') {
      response = await fetch(ingredientEndpoint);
    } else if (option === 'name') {
      response = await fetch(nameEndpoint);
    } else {
      response = await fetch(firstLetterEndpoint);
    }
    const data = await response.json();
    console.log(data);
  }, [searchByType]);

  const handleClickApi = useCallback(() => {
    const { valueToSearch, option } = searchByType;
    if (option === 'primeiraLetra' && valueToSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      fetchMealsApi();
    }
  }, [fetchMealsApi, searchByType]);

  const context = useMemo(() => ({
    searchBtn,
    showsearchBtn,
    handleSearchChange,
    handleClickApi,
  }), [searchBtn, showsearchBtn, handleSearchChange, handleClickApi]);

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
