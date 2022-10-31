import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
// import Footer from './Footer';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { getInProgressRecipe, saveInProgressRecipe } from '../services/inProgressStorage';
import { getDoneRecipes } from '../services/doneStorage';
import ShareAndFavorite from './ShareAndFavorite';

function RecipesDetails() {
  const { location: { pathname } } = useHistory();
  const params = useParams();
  console.log(params);
  const { setSelectedRecipe,
    selectedRecipe,
    setSuggestions,
    suggestions,
    setStartedRecipe,
    getRecipeIngredients,
    ingredients,
    getRecipeIngredientsMeasures,
    measures } = useContext(AppContext);

  const seis = 6;
  const sixSuggestions = suggestions.slice(0, seis);

  const idOfMeal = pathname.replace('/meals/', '');
  const idOfDrink = pathname.replace('/drinks/', '');

  const [done, setGetDone] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  useEffect(() => {
    setGetDone(() => getDoneRecipes());
    setInProgress(() => saveInProgressRecipe());
    setInProgress(() => getInProgressRecipe());
    console.log(inProgress);
  }, []);

  const getyoutubeParam = 32;

  useEffect(() => {
    const fetchDetail = async () => {
      const detailsMealsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idOfMeal}`;
      const detailsDrinksEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idOfDrink}`;
      let response;
      let key;
      if (pathname === `/meals/${idOfMeal}`) {
        response = await fetch(detailsMealsEndPoint);
        key = 'meals';
      } else {
        response = await fetch(detailsDrinksEndPoint);
        key = 'drinks';
      }
      const data = await response.json();
      setSelectedRecipe(data[key]);
      getRecipeIngredients(data[key]);
      getRecipeIngredientsMeasures(data[key]);
    };
    fetchDetail();
  }, [pathname,
    setSelectedRecipe,
    idOfMeal,
    idOfDrink,
    getRecipeIngredients,
    getRecipeIngredientsMeasures]);

  useEffect(() => {
    console.log('estou em recipe details');
    const fetchSuggestion = async () => {
      const sugMealsEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const sugDrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      let response;
      let key;
      if (pathname === `/meals/${idOfMeal}`) {
        response = await fetch(sugDrinksEndPoint);
        key = 'drinks';
      } else {
        response = await fetch(sugMealsEndPoint);
        key = 'meals';
      }
      const data = await response.json();
      setSuggestions(data[key]);
    };
    fetchSuggestion();
  }, [idOfDrink, idOfMeal, pathname, setSuggestions]);

  return (
    <div>
      <div>
        <p>Recipes Details</p>
        {
          selectedRecipe.map((recipe) => (
            <div key={ recipe.idMeal ? recipe.idMeal : recipe.idDrink }>
              <h3
                data-testid="recipe-title"
              >
                { recipe.strMeal ? recipe.strMeal : recipe.strDrink }
              </h3>
              <ShareAndFavorite />
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

        <h3>Ingredients:</h3>
        {
          ingredients.map((ingredient, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ `${index}-${ingredient}` }
            >
              {`${ingredient}: ${measures[index]}`}

            </p>
          ))
        }

        <h3>Intructions:</h3>
        {
          selectedRecipe.length > 0 && (
            <p data-testid="instructions">{selectedRecipe[0].strInstructions}</p>
          )
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
      </div>
      <div className="carousel">
        {
          sixSuggestions.map((e, i) => (
            <div
              className="suggestions"
              key={ e.idMeal ? e.idMeal : e.idDrink }
              data-testid={ `${i}-recommendation-card` }
            >
              <img
                className="imgSuggestion"
                src={ e.strMealThumb
                  ? e.strMealThumb
                  : e.strDrinkThumb }
                alt={ e.strMeal ? e.strMeal : e.strDrink }
              />
              <h2
                data-testid={ `${i}-recommendation-title` }
              >
                {e.strMeal ? e.strMeal : e.strDrink}
              </h2>
            </div>
          ))
        }
      </div>
      {
        (!done && !inProgress)
        // depois precisaremos verificar o id da comida ou bebida salvas no estado para fazer a renderização correta
        // a renderização desse botão dependerá da vericação do localStorage, a lógica seguinte é provisória
        && (
          <div className="marginBtn">
            <button
              className="startRecipeBtn"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => setStartedRecipe(selectedRecipe) }
            >
              Start Recipe
            </button>
          </div>)
      }
      {
        (!done && inProgress)
        && (
          <div className="marginBtn">
            <Link to={ `${pathname}/in-progress` }>
              <button
                className="startRecipeBtn"
                type="button"
                data-testid="start-recipe-btn"
              >
                Continue Recipe
              </button>
            </Link>
          </div>)
      }
      {/* <Footer /> */}
    </div>
  );
}
export default RecipesDetails;
