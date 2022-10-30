import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import { getFavorites, saveFavorites } from '../services/saveRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

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

  const saveFavoriteRecipe = () => {
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
      updateFavorites = [...favorites, recipe];
    } else {
      updateFavorites = [recipe];
    }
    saveFavorites(updateFavorites);
  };

  const checkFavoriteRecipe = useCallback(() => {
    const favorites = getFavorites();
    const pageType = pathname.includes('meals');
    let recipeId;

    if (pageType) {
      recipeId = pathname.replace('/meals/', '');
    } else {
      recipeId = pathname.replace('/drinks/', '');
    }

    if (favorites !== null) {
      const checkFavorite = favorites.some((recipe) => recipe.id === recipeId);
      if (checkFavorite) {
        setHasFavorite(checkFavorite);
      }
    }
  }, [pathname]);

  useEffect(() => {
    checkFavoriteRecipe();
  }, [checkFavoriteRecipe]);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => getCopiedLink() }
      >
        Share
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
      {/* {
        hasFavorite
          ? <img src={ blackHeartIcon } alt="favorite" />
          : <img src={ whiteHeartIcon } alt="favorite" />
      } */}
    </div>
  );
}

export default ShareAndFavorite;
