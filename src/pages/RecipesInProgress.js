import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import ShareAndFavorite from '../components/ShareAndFavorite';
import { saveDoneRecipe } from '../services/doneStorage';

export default function RecipesInProgress() {
  const { location: { pathname } } = useHistory();
  const { setSelectedRecipe,
    selectedRecipe,
    getRecipeIngredients,
    ingredients,
    getRecipeIngredientsMeasures,
    measures } = useContext(AppContext);

  /* const [isActive, setIsActive] = useState(false); */

  const { id } = useParams();
  const handleClick = () => {
    // setIsActive(!isActive);
    const ingrediente = document.getElementsByClassName('ingredients');
    ingrediente.classList.add('checked');
  };

  const getyoutubeParam = 32;

  console.log(selectedRecipe);
  console.log(isActive, 'is');

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
      const data = await response.json();
      setSelectedRecipe(data[key]);
      getRecipeIngredients(data[key]);
      getRecipeIngredientsMeasures(data[key]);
    };
    fetchDetail();
  }, [pathname,
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
            >
              <input
                className="box"
                type="checkbox"
                name="ingredient"
                id={ `${index}-ingredient` }
                // className={ isActive ? 'checked' : '' }
                onClick={ handleClick }
              />
            </label>
            <p
              data-testid="instructions"
            >
              {`${ingredient}: ${measures[index]}`}

            </p>
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
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>

  );
}
