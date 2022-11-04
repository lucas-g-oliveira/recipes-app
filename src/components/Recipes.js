import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';

function Recipes() {
  const {
    results,
    categories,
    resetFilter,
    setResults,
    handleClickToggle,
    fetchCategory,
    setMealsResults,
    setDrinksResults,
  } = useContext(AppContext);
  const doze = 12;
  const { location: { pathname } } = useHistory();
  const resultsMap = results.slice(0, doze);

  useEffect(() => {
    const fetchTudo = async () => {
      let generalFechEndpoint;
      let key;
      if (pathname === '/meals') {
        generalFechEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        key = 'meals';
      } else {
        generalFechEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        key = 'drinks';
      }
      const response = await fetch(generalFechEndpoint);
      const data = await response.json();
      setResults(data[key]);
      fetchCategory(key);
      if (key === 'meals') {
        setMealsResults(data[key]);
      } else {
        setDrinksResults(data[key]);
      }
    };
    fetchTudo();
  }, [pathname, setResults, fetchCategory, setMealsResults, setDrinksResults]);

  return (
    <div>
      <div>
        <div className="filter-buton">
          {categories.map((a) => (
            <input
              key={ a.strCategory }
              type="button"
              value={ a.strCategory }
              className="buttonFilter"
              data-testid={ `${a.strCategory}-category-filter` }
              onClick={ () => handleClickToggle(pathname, a.strCategory) }
            />
          ))}
          <input
            value="All"
            type="button"
            className="buttonFilter"
            onClick={ () => resetFilter(pathname) }
            data-testid="All-category-filter"
          />
        </div>
        <div className="receitas">
          {
            resultsMap.map((result, index) => (
              <div
                className="card-recipe"
                data-testid={ `${index}-recipe-card` }
                key={ result.idMeal ? result.idMeal : result.idDrink }
              >
                <Link
                  to={ `${pathname}/${result.idMeal ? result.idMeal : result.idDrink}` }
                >
                  <div>
                    <img
                      className="img-recipes"
                      data-testid={ `${index}-card-img` }
                      src={ result.strMealThumb
                        ? result.strMealThumb
                        : result.strDrinkThumb }
                      alt={ result.strMeal ? result.strMeal : result.strDrink }
                    />
                    <p
                      className="recipe-name"
                      data-testid={ `${index}-card-name` }
                    >
                      {result.strMeal ? result.strMeal : result.strDrink}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Recipes;
