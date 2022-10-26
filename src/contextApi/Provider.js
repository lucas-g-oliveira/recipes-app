import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchBtn, setSearchBtn] = useState(false);
  const [searchByType, setSearchByType] = useState({
    valueToSearch: '',
    option: '',
  });
  const [mealsResults, setMealsResults] = useState([]);
  const [drinksResults, setDrinksResults] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');

  const showsearchBtn = useCallback(() => {
    setSearchBtn(!searchBtn);
  }, [searchBtn]);

  const handleSearchChange = useCallback(({ target }) => {
    const { name, value } = target;
    setSearchByType({ ...searchByType, [name]: value });
  }, [searchByType]);

  const fetchMealsApi = useCallback(async () => {
    const { valueToSearch, option } = searchByType;
    const ingredientEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueToSearch}`;
    const nameEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valueToSearch}`;
    const firstLetterEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valueToSearch}`;
    const generalFechEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    let response;
    if (option === 'ingredientes') {
      response = await fetch(ingredientEndpoint);
    } else if (option === 'name') {
      response = await fetch(nameEndpoint);
    } else if (option === 'primeiraLetra') {
      response = await fetch(firstLetterEndpoint);
    } else {
      response = await fetch(generalFechEndpoint);
    }
    const data = await response.json();

    if (data.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setMealsResults(data.meals);
      setResults(data.meals);
    }
  }, [searchByType]);

  const fetchDrinksApi = useCallback(async () => {
    const { valueToSearch, option } = searchByType;
    const ingredientEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valueToSearch}`;
    const nameEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueToSearch}`;
    const firstLetterEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valueToSearch}`;
    const generalFechEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    let response;
    if (option === 'ingredientes') {
      response = await fetch(ingredientEndpoint);
    } else if (option === 'name') {
      response = await fetch(nameEndpoint);
    } else if (option === 'primeiraLetra') {
      response = await fetch(firstLetterEndpoint);
    } else {
      response = await fetch(generalFechEndpoint);
    }
    const data = await response.json();

    if (data.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setDrinksResults(data.drinks);
      setResults(data.drinks);
    }
  }, [searchByType]);

  const handleClickApi = useCallback((pathname) => {
    const { valueToSearch, option } = searchByType;
    if (option === 'primeiraLetra' && valueToSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (pathname === '/meals') {
      fetchMealsApi();
    } else {
      fetchDrinksApi();
    }
  }, [fetchMealsApi, fetchDrinksApi, searchByType]);

  const context = useMemo(() => ({
    searchBtn,
    showsearchBtn,
    mealsResults,
    drinksResults,
    handleSearchChange,
    handleClickApi,
    setResults,
    results,
    fetchDrinksApi,
    fetchMealsApi,
    selectedRecipe,
    setSelectedRecipe,
  }), [
    searchBtn,
    showsearchBtn,
    mealsResults,
    drinksResults,
    handleSearchChange,
    handleClickApi,
    setResults,
    results,
    fetchDrinksApi,
    fetchMealsApi,
    selectedRecipe,
    setSelectedRecipe,
  ]);

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
