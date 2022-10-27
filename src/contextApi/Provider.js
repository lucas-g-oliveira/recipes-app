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
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idRecipe, setIdRecipe] = useState('');
  const [filterToggle, setFilterToggle] = useState(false);

  const showsearchBtn = useCallback(() => {
    setSearchBtn(!searchBtn);
  }, [searchBtn]);

  const handleSearchChange = useCallback(({ target }) => {
    const { name, value } = target;
    setSearchByType({ ...searchByType, [name]: value });
  }, [searchByType]);

  const fetchCategory = useCallback(async (pathname) => {
    let endpoint;
    let key;
    if (pathname === 'meals') {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      key = 'meals';
    } else {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      key = 'drinks';
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    const cinco = 5;
    const resultsCategories = data[key].slice(0, cinco);
    // console.log(resultsCategories);
    setCategories(resultsCategories);
  }, []);

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
    fetchCategory('meals');
  }, [searchByType, fetchCategory]);

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
    fetchCategory('drinks');
  }, [searchByType, fetchCategory]);

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

  const setFilterByCategory = useCallback(async (pathname, categorie) => {
    let endpoint;
    let key;
    if (pathname === '/meals') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
      key = 'meals';
    } else {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
      key = 'drinks';
    }

    const response = await fetch(endpoint);
    const data = await response.json();
    setResults(data[key]);
  }, []);

  const resetFilter = useCallback((pathname) => {
    if (pathname === '/meals') {
      setResults(mealsResults);
    } else {
      setResults(drinksResults);
    }
  }, [mealsResults, drinksResults]);

  const handleClickToggle = useCallback((pathname, categorie) => {
    if (!filterToggle) {
      setFilterByCategory(pathname, categorie);
      setFilterToggle(!filterToggle);
    } else {
      resetFilter(pathname);
      setFilterToggle(!filterToggle);
    }
  }, [filterToggle, setFilterToggle, resetFilter, setFilterByCategory]);

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
    idRecipe,
    setIdRecipe,
    fetchCategory,
    categories,
    setFilterByCategory,
    resetFilter,
    handleClickToggle,
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
    idRecipe,
    setIdRecipe,
    fetchCategory,
    categories,
    setFilterByCategory,
    resetFilter,
    handleClickToggle,
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
