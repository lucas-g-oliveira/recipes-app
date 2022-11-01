import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import { getFavorites, saveFavorites } from '../services/favoriteStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareAndFavorite() {
  const { location: { pathname } } = useHistory();
  const { selectedRecipe } = useContext(AppContext);

  const [hasCopy, setHasCopy] = useState(false);
  const [hasFavorite, setHasFavorite] = useState(false);

  const getCopiedLink = () => {
    copy(`http://localhost:3000${pathname}`);
    setHasCopy(true);
  };

  const saveFavoriteRecipe = useCallback(() => {
    const favorites = getFavorites();

    const recipe = {
      id: selectedRecipe[0].idMeal ? selectedRecipe[0].idMeal : selectedRecipe[0].idDrink,
      type: selectedRecipe[0].idMeal ? 'meal' : 'drink',
      nationality: selectedRecipe[0].strArea
        ? selectedRecipe[0].strArea
        : '',
      category: selectedRecipe[0].strCategory,
      alcoholicOrNot: selectedRecipe[0].strAlcoholic
        ? selectedRecipe[0].strAlcoholic
        : '',
      name: selectedRecipe[0].strMeal
        ? selectedRecipe[0].strMeal
        : selectedRecipe[0].strDrink,
      image: selectedRecipe[0].strMealThumb
        ? selectedRecipe[0].strMealThumb
        : selectedRecipe[0].strDrinkThumb,
    };

    let updateFavorites;

    if (favorites !== null) {
      const checkFavorite = favorites.some((favorite) => favorite.id === recipe.id);
      if (checkFavorite) {
        updateFavorites = favorites.filter((favorite) => favorite.id !== recipe.id);
        setHasFavorite(false);
      } else {
        updateFavorites = [...favorites, recipe];
        setHasFavorite(true);
      }
    } else {
      updateFavorites = [recipe];
      setHasFavorite(true);
    }
    saveFavorites(updateFavorites);
  }, [selectedRecipe]);

  const checkFavoriteRecipe = useCallback(() => {
    const favorites = getFavorites();
    const pageType = pathname.includes('meals');
    let recipeId;

    if (pageType) {
      recipeId = pathname.replace('/meals/', '');
    } else {
      recipeId = pathname.replace('/drinks/', '');
    }

    setHasFavorite(false);
    if (favorites !== null) {
      const checkFavorite = favorites.some((recipe) => recipe.id === recipeId);
      if (checkFavorite) {
        setHasFavorite(checkFavorite);
      }
    }
  }, [pathname]);

  useEffect(() => {
    // saveFavoriteRecipe();
    checkFavoriteRecipe();
  }, [checkFavoriteRecipe]);

  return (
    <div>
      <button
        type="button"
        onClick={ () => getCopiedLink() }
      >
        <img src={ shareIcon } alt="share" data-testid="share-btn" />
      </button>
      <button
        type="button"
        onClick={ saveFavoriteRecipe }
        src={ hasFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        {
          hasFavorite
            ? <img src={ blackHeartIcon } alt="favorite" data-testid="favorite-btn" />
            : <img src={ whiteHeartIcon } alt="favorite" data-testid="favorite-btn" />
        }
      </button>
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

export default ShareAndFavorite;
