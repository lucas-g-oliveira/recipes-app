import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import ShareAndFavorite from '../components/ShareAndFavorite';
import { saveDoneRecipe } from '../services/doneStorage';
import {
  getInProgressRecipe,
  saveInProgressRecipe,
  addProgressToRecipe } from '../services/inProgressStorage';

function RecipesInProgress() {
  const { location: { pathname } } = useHistory();
  const { setSelectedRecipe,
    selectedRecipe,
    getRecipeIngredients,
    ingredients,
    getRecipeIngredientsMeasures,
    measures } = useContext(AppContext);

  // const [isActive, setIsActive] = useState(false);
  const [ingredChecked, setIngredChecked] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [currPage, setCurrPage] = useState('');
  const { id } = useParams();

  // const verificaIngrediente = (ingrendient) => ingredChecked.includes(ingrendient);

  // essa funcao salva apenas o id da receita no localStorage na chave inProgressRecipes.
  // refatorado no requisito 40

  const setListIngredientStorage = (idRecipe, ingrendient) => {
    const objLocalSt = getInProgressRecipe();
    const exist = objLocalSt[currPage][idRecipe].includes(ingrendient);
    if (exist) {
      const tiraIngrediente = objLocalSt[currPage][idRecipe]
        .filter((e) => e !== ingrendient);
      objLocalSt[currPage][idRecipe] = tiraIngrediente;
    } else {
      objLocalSt[currPage][idRecipe] = [...objLocalSt[currPage][idRecipe], ingrendient];
    }

    setIngredChecked([...objLocalSt[currPage][idRecipe]]);
    saveInProgressRecipe(objLocalSt);
  };

  // const ternaryTest = (ifTrue, ifFalse) => ifTrue ?? ifFalse;

  const handleClick = ({ target: { name } }) => {
    setListIngredientStorage(id, name);
  };

  const getyoutubeParam = 32;
  useEffect(() => {
    const fetchDetail = async () => {
      const detailsMealsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const detailsDrinksEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      let response;
      let key;
      if (pathname.includes('/meals')) {
        response = await fetch(detailsMealsEndPoint);
        key = 'meals';
        setCurrPage(key);
      } else {
        response = await fetch(detailsDrinksEndPoint);
        key = 'drinks';
        setCurrPage(key);
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
    isDone,
    setIngredChecked,
    setSelectedRecipe,
    getRecipeIngredients,
    getRecipeIngredientsMeasures,
    id]);

  return isDone ? (<Redirect to="/done-recipes" />) : (
    <div>
      <h3>IN PROGRESS</h3>
      <ShareAndFavorite />
      {
        selectedRecipe.map((recipe) => (
          <div key={ recipe.idMeal ?? recipe.idDrink }>
            <h3
              data-testid="recipe-title"
            >
              { recipe.strMeal ?? recipe.strDrink }
            </h3>
            <img
              // src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
              src={ recipe.strMealThumb ?? recipe.strDrinkThumb }
              alt="recipe"
              data-testid="recipe-photo"
              width="300px"
            />
            <p data-testid="recipe-category">
              {/* { recipe.strAlcoholic ? `${recipe.strCategory} ${recipe.strAlcoholic}` : recipe.strCategory} */}
              {`${recipe.strCategory} ${recipe.strAlcoholic}`}
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
              className={ ingredChecked.includes(ingredient) && 'checked' }
            >
              {`${ingredient}: ${measures[index]}`}
              <input
                type="checkbox"
                name={ ingredient }
                id={ `${index}-ingredient` }
                onChange={ handleClick }
                checked={ ingredChecked.includes(ingredient) }
              />
            </label>
          </div>
        ))
      }

      <h3 className="titulo">Intructions:</h3>
      {
        selectedRecipe.length > 0 && (
          <p data-testid="instructions">{selectedRecipe[0].strInstructions}</p>
        )
      }
      <button
        type="button"
        onClick={ () => {
          saveDoneRecipe(selectedRecipe);
          setIsDone(true);
        } }
        disabled={ ingredients.length !== ingredChecked.length }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipesInProgress;
