import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import ShareAndFavorite from '../components/ShareAndFavorite';
import { saveDoneRecipe } from '../services/doneStorage';
import { getInProgressRecipe, saveInProgressRecipe } from '../services/inProgressStorage';

export default function RecipesInProgress() {
  const { location: { pathname } } = useHistory();
  const { setSelectedRecipe,
    selectedRecipe,
    getRecipeIngredients,
    ingredients,
    getRecipeIngredientsMeasures,
    measures } = useContext(AppContext);

  // const [isActive, setIsActive] = useState(false);
  const [ingredChecked, setIngredChecked] = useState([]);
  const { id } = useParams();

  const verificaIngrediente = (ingrendient) => {
    if (ingredChecked) {
      return ingredChecked.some((e) => e === ingrendient);
    }
    return false;
  };

  // essa funcao salva apenas o id da receita no localStorage na chave inProgressRecipes.
  // refatorado no requisito 40
  const addProgressToRecipe = (page, recipeId) => {
    let updateProgress = getInProgressRecipe();
    const test = (JSON.stringify(updateProgress).includes(recipeId)) ?? false;
    if (!test) {
      updateProgress[page][recipeId] = [];
      const newId = { [id]: [] };
      updateProgress = {
        ...updateProgress,
        [page]: {
          ...[page],
          [recipeId]: [...updateProgress.page, recipeId],
        },
      };
    }
    saveInProgressRecipe(updateProgress);
  };

  const setListIngredientStorage = (idRecipe, ingrendient) => {
    const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
    const objLocalSt = getInProgressRecipe();
    const exist = objLocalSt[type][idRecipe].some((e) => e === ingrendient);
    if (exist) {
      const tiraIngrediente = objLocalSt[type][idRecipe].filter((e) => e !== ingrendient);
      objLocalSt[type][idRecipe] = tiraIngrediente;
    } else {
      objLocalSt[type][idRecipe] = [...objLocalSt[type][idRecipe], ingrendient];
    }

    setIngredChecked([...objLocalSt[type][idRecipe]]);
    saveInProgressRecipe(objLocalSt);
  };

  const handleClick = ({ target: { name } }) => {
    setListIngredientStorage(id, name);
    /* console.log('chamando id', id); */
    // setIsActive(!isActive);
    // const ingrediente = document.getElementsByClassName('ingredients');
    // target.currentTarget.classList.add('checked');
  };

  const getyoutubeParam = 32;

  // console.log(selectedRecipe);
  // console.log(isActive, 'is');
  console.log(ingredChecked);
  useEffect(() => {
    const fetchDetail = async () => {
      const detailsMealsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const detailsDrinksEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      let response;
      let key;
      if (pathname.includes('/meals')) {
        response = await fetch(detailsMealsEndPoint);
        key = 'meals';
      } else {
        response = await fetch(detailsDrinksEndPoint);
        key = 'drinks';
      }
      addProgressToRecipe(key, id);
      const data = await response.json();
      const ingredientsStorage = getInProgressRecipe();
      setIngredChecked(ingredientsStorage[key][id]);
      setSelectedRecipe(data[key]);
      getRecipeIngredients(data[key]);
      getRecipeIngredientsMeasures(data[key]);
      // handleProgressStorage();
    };
    fetchDetail();
  }, [pathname,
    setIngredChecked,
    setSelectedRecipe,
    getRecipeIngredients,
    getRecipeIngredientsMeasures,
    id]);

  console.log('estou in progress');

  return (

    <div>
      <h3>IN PROGRESS</h3>
      <ShareAndFavorite />
      {
        selectedRecipe.map((recipe) => (
          <div key={ recipe.idMeal ? recipe.idMeal : recipe.idDrink }>
            <h3
              data-testid="recipe-title"
            >
              { recipe.strMeal ? recipe.strMeal : recipe.strDrink }
            </h3>
            <img
              src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt="recipe"
              data-testid="recipe-photo"
              width="300px"
            />
            <p data-testid="recipe-category">
              {
                recipe.strAlcoholic
                  ? `${recipe.strCategory} ${recipe.strAlcoholic}`
                  : recipe.strCategory
              }
            </p>
          </div>
        ))
      }

      {
        (selectedRecipe.length > 0 && selectedRecipe[0].strYoutube) && (
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${selectedRecipe[0].strYoutube.slice(getyoutubeParam)}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
  clipboard-write;
  encrypted-media;
  gyroscope;
  picture-in-picture"
            allowFullScreen
          />
        )
      }

      <h3>Ingredients:</h3>
      {
        ingredients.map((ingredient, index) => (
          <div
            key={ `${index}-${ingredient}` }
            className="ingredients"
          >
            <label
              htmlFor={ `${index}-ingredient` }
              data-testid={ `${index}-ingredient-step` }
              className={ verificaIngrediente(ingredient) ? 'checked' : '' }
            >
              {`${ingredient}: ${measures[index]}`}
              <input
                // className="box"
                type="checkbox"
                name={ ingredient }
                id={ `${index}-ingredient` }
                onChange={ handleClick }
                checked={ verificaIngrediente(ingredient) }
              />
            </label>
            {/* <p
              data-testid="instructions"
              // classList={ isActive ? 'checked' : '' }
            >
              {`${ingredient}: ${measures[index]}`}

            </p> */}
          </div>
        ))
      }

      <h3>Intructions:</h3>
      {
        selectedRecipe.length > 0 && (
          <>
            {/*  <input
              type="checkbox"
              name="intructions"
            /> */}
            <p data-testid="instructions">{selectedRecipe[0].strInstructions}</p>
          </>
        )
      }
      <button
        type="button"
        onClick={ () => saveDoneRecipe(selectedRecipe) }
        disabled={ ingredients.length !== ingredChecked.length }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>

  );
}
