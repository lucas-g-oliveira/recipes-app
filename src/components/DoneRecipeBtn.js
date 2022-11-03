import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import { saveDoneRecipe, getDoneRecipes } from '../services/doneStorage';

function DoneRecipeBtn(props) {
  const { ingredChecked } = props;
  console.log(typeof ingredChecked);
  const { selectedRecipe, ingredients } = useContext(AppContext);
  const [isDone, setIsDone] = useState(false);

  const saveDoneRecipes = () => {
    const allDone = getDoneRecipes();

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
      doneDate: new Date().toISOString(),
      tags: selectedRecipe[0].strMeal
        ? selectedRecipe[0].strTags.split(',')
        : [],
    };

    let updateAllDone;

    if (allDone !== null) {
      updateAllDone = [...allDone, recipe];
    } else {
      updateAllDone = [recipe];
    }
    saveDoneRecipe(updateAllDone);
    setIsDone(true);
  };

  return (
    <div>
      {
        isDone ? (<Redirect to="/done-recipes" />) : (

          <button
            type="button"
            onClick={ saveDoneRecipes }
            disabled={ ingredients.length !== ingredChecked.length }
            data-testid="finish-recipe-btn"
          >
            Done Recipe
          </button>
        )
      }
    </div>
  );
}

DoneRecipeBtn.propTypes = {
  ingredChecked: PropTypes.shape().isRequired,
};

export default DoneRecipeBtn;
