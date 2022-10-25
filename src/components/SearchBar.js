import React, { useContext } from 'react';
import AppContext from '../contextApi/AppContext';

function SearchBar() {
  const { handleSearchChange, handleClickApi } = useContext(AppContext);

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="valueToSearch"
        onChange={ handleSearchChange }
      />
      <label htmlFor="ingredientes">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredientes"
          name="option"
          id="ingredientes"
          onChange={ handleSearchChange }
        />
        Ingredientes
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          value="name"
          name="option"
          id="name"
          onChange={ handleSearchChange }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          value="primeiraLetra"
          data-testid="first-letter-search-radio"
          name="option"
          id="first-letter"
          onChange={ handleSearchChange }
        />
        Primeira letra
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleClickApi }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
