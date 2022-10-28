import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import Footer from './Footer';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

function RecipesDetails() {
  const { location: { pathname } } = useHistory();
  const { setSelectedRecipe,
    selectedRecipe,
    setSuggestions,
    suggestions,
    setStartedRecipe } = useContext(AppContext);

  const seis = 6;
  const sixSuggestions = suggestions.slice(0, seis);
  console.log(selectedRecipe);
  if (selectedRecipe.length > 1) {
    const recipeKeys = Object.entries(selectedRecipe[0]);
    //   .filter((element) => (
    //     element[0].includes('strIngredient')
    //   ));
    // console.log(recipeKeys);
    const ingredients = recipeKeys.filter((element) => (
      element[0].includes('strIngredient')
    ));
    console.log(ingredients);
  }
  // const ingredients = recipeKeys
  //   .filter((element) => element[0].includes('strIngredient'));
  // console.log(ingredients);

  /* setSelectedRecipe(pathname); */
  const idOfMeal = pathname.replace('/meals/', '');
  const idOfDrink = pathname.replace('/drinks/', '');

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
    };
    fetchDetail();
  }, [pathname, setSelectedRecipe, idOfMeal, idOfDrink]);

  useEffect(() => {
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
  console.log('sugestoes', suggestions);

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
              <img
                src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
                alt="recipe"
                data-testid="recipe-photo"
                width="300px"
              />
              <p data-testid="recipe-category">{ recipe.strCategory }</p>
            </div>
          ))
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
      <div className="marginBtn">
        <button
          className="startRecipeBtn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => setStartedRecipe(selectedRecipe) }
        >
          Start Recipe
        </button>

      </div>
      <Footer />
    </div>
  );
}
export default RecipesDetails;
