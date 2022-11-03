import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { getInProgressRecipe } from '../services/inProgressStorage';
import { getDoneRecipes } from '../services/doneStorage';

function StartRecipeBtn() {
  const { location: { pathname } } = useHistory();
  const page = pathname.includes('meals') ? 'meals' : 'drinks';
  const { id: recipeId } = useParams();

  const [done, setGetDone] = useState([]);
  const [hasDone, setHasDone] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);

  const updateRecipeProgress = useCallback(() => {
    const updateProgress = getInProgressRecipe();
    if (updateProgress !== null && updateProgress[page][recipeId]) {
      const started = true;
      setHasProgress(started);
    }

    const updateDoneRecipes = getDoneRecipes();
    if (updateDoneRecipes !== null) {
      setGetDone(updateDoneRecipes);
      const finished = updateDoneRecipes.some((recipe) => recipe.id === recipeId);
      console.log('finished', finished);
      setHasDone(finished);
    }
  }, [page, recipeId]);

  useEffect(() => {
    updateRecipeProgress();
  }, [updateRecipeProgress]);

  return (
    <div className="marginBtn">
      {
        (!hasDone && !hasProgress) && (
          <Link to={ `${pathname}/in-progress` }>
            <button
              className="startRecipeBtn"
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          </Link>
        )
      }
      {
        (!hasDone && hasProgress) && (
          <Link to={ `${pathname}/in-progress` }>
            <button
              className="startRecipeBtn"
              type="button"
              data-testid="start-recipe-btn"
            >
              Continue Recipe
            </button>
          </Link>
        )
      }
      {
        done.some((recipe) => recipe.id === recipeId)
          && <Link to={ `/${page}` }>Recipe Already Done</Link>
      }
    </div>
  );
}

export default StartRecipeBtn;
