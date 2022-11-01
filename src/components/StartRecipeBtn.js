import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { getInProgressRecipe, saveInProgressRecipe } from '../services/inProgressStorage';
import { getDoneRecipes } from '../services/doneStorage';

function StartRecipeBtn() {
  const { location: { pathname } } = useHistory();
  const page = pathname.includes('meals') ? 'meals' : 'drinks';
  const { id: recipeId } = useParams();

  const [done, setGetDone] = useState([]);
  const [hasDone, setHasDone] = useState(false);
  const [inProgress, setInProgress] = useState([]);
  const [hasProgress, setHasProgress] = useState(false);
  console.log('done', done);

  const updateRecipeProgress = useCallback(() => {
    const updateProgress = getInProgressRecipe();
    if (updateProgress !== null) {
      setInProgress(updateProgress);
      if (updateProgress[page].length > 0) {
        const started = updateProgress[page].some((id) => id === recipeId);
        setHasProgress(started);
      }
    }

    const updateDoneRecipes = getDoneRecipes();
    if (updateDoneRecipes !== null) {
      setGetDone(updateProgress);
      const finished = updateDoneRecipes.some((recipe) => recipe.id === recipeId);
      console.log('finished', finished);
      setHasDone(finished);
    }
  }, [page, recipeId]);

  // essa funcao salva apenas o id da receita no localStorage na chave inProgressRecipes.
  // refatorar no requisito 40
  const addProgressToRecipe = () => {
    let updateProgress;
    if (inProgress[page]) {
      updateProgress = {
        ...inProgress,
        [page]: [...inProgress[page], recipeId],
      };
    } else {
      updateProgress = { ...inProgress, [page]: [recipeId] };
    }
    saveInProgressRecipe(updateProgress);
  };

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
              onClick={ () => addProgressToRecipe() }
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
    </div>
  );
}

export default StartRecipeBtn;
