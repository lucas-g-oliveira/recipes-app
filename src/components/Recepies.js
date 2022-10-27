import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import Footer from './Footer';

function Recipes() {
  const {
    results,
    fetchMealsApi,
    fetchDrinksApi,
    categories,
    // setFilterByCategory,
    resetFilter,
    handleClickToggle,
  } = useContext(AppContext);
  const doze = 12;
  const { location: { pathname } } = useHistory();
  const resultsMap = results.slice(0, doze);
  console.log(resultsMap);

  useEffect(() => {
    const fetchTudo = async () => {
      if (pathname === '/meals') {
        fetchMealsApi();
      } else {
        fetchDrinksApi();
      }
    };
    fetchTudo();
  }, [pathname, fetchMealsApi, fetchDrinksApi]);

  // useEffect(() => {
  //   fetchCategory();
  // }, []);

  return (
    <div>
      <div>
        {
          categories.map((a) => (
            <input
              key={ a.strCategory }
              type="button"
              value={ a.strCategory }
              data-testid={ `${a.strCategory}-category-filter` }
              onClick={ () => handleClickToggle(pathname, a.strCategory) }
            />
          ))
        }
        <input
          value="All"
          type="button"
          onClick={ () => resetFilter(pathname) }
          data-testid="All-category-filter"
        />
        {
          resultsMap.map((result, index) => (
            <div
              key={ result.idMeal ? result.idMeal : result.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <Link
                to={ result.idMeal
                  ? (`${pathname}/${result.idMeal}`)
                  : (`${pathname}/${result.idDrink}`) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ result.strMealThumb ? result.strMealThumb : result.strDrinkThumb }
                  alt={ result.strMeal ? result.strMeal : result.strDrink }
                />
              </Link>
              <p
                data-testid={ `${index}-card-name` }
              >
                { result.strMeal ? result.strMeal : result.strDrink }
              </p>
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
