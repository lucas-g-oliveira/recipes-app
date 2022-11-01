import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites } from '../services/favoriteStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);
  const [hasCopy, setHasCopy] = useState(false);

  const updateFavoriteRecipes = useCallback(() => {
    const favorites = getFavorites();
    console.log(favorites);
    if (favorites !== null) {
      setFavoriteRecipes(favorites);
      setFilteredFavoriteRecipes(favorites);
    }
  }, []);

  const filterbyType = useCallback((type) => {
    let updateFilter;
    if (type === 'meals') {
      updateFilter = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
    } else if (type === 'drinks') {
      updateFilter = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
    } else {
      updateFilter = [...favoriteRecipes];
    }
    setFilteredFavoriteRecipes(updateFilter);
  }, [favoriteRecipes]);

  const getCopiedLink = (page, recipeId) => {
    copy(`http://localhost:3000/${page}s/${recipeId}`);
    setHasCopy(true);
  };

  useEffect(() => {
    updateFavoriteRecipes();
  }, [updateFavoriteRecipes]);

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterbyType }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterbyType('meals') }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterbyType('drinks') }
        >
          Drinks
        </button>
      </div>
      {(filteredFavoriteRecipes.length > 0) && filteredFavoriteRecipes.map((e, index) => (
        <div key={ e.id }>
          <Link to={ `/${e.type}s/${e.id}` }>
            <img
              src={ e.image }
              data-testid={ `${index}-horizontal-image` }
              alt="recipe"
              width="300px"
            />
          </Link>
          {
            e.type === 'meal'
              ? (
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {`${e.nationality} - ${e.category}`}
                </h4>
              )
              : (
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {`${e.category} - ${e.alcoholicOrNot}`}
                </h4>
              )
          }
          <Link to={ `/${e.type}s/${e.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>
              {e.name}
            </h3>
          </Link>

          <p data-testid={ `${index}-horizontal-done-date` }>
            {e.doneDate}
          </p>
          <button
            type="button"
            onClick={ () => getCopiedLink(e.type, e.id) }
          >
            <img
              src={ shareIcon }
              alt="shareBtn"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>

          <button
            type="button"
            onClick={ () => getCopiedLink(e.type, e.id) }
          >
            <img
              src={ blackHeartIcon }
              alt="favorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          {/* {
            (e.tags.filter((_tag, indiceTag) => indiceTag < 2)
              .map((tag) => (
                <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
                  {tag}
                </p>
              )))
          } */}
        </div>
      ))}
      {
        hasCopy && (
          <div>
            <p>Link copied!</p>
            <button type="button" onClick={ () => setHasCopy(false) }>Ok</button>
          </div>
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
