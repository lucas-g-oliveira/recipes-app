import React from 'react';

function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="text" />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        value="ingredientes"
        name="option"
      />
      <input
        type="radio"
        data-testid="name-search-radio"
        value="Name"
        name="option"
      />
      <input
        type="radio"
        value="Primeira letra"
        data-testid="first-letter-search-radio"
        name="option"
      />
      <button type="submit" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}

export default SearchBar;
