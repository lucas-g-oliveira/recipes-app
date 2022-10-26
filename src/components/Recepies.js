import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import Footer from './Footer';

function Recipes() {
  const {
    results,
    fetchMealsApi,
    fetchDrinksApi,
    categories,
    setFilterByCategory,
    resetFilter,
  } = useContext(AppContext);
  const doze = 12;
  const { location: { pathname } } = useHistory();
  const resultsMap = results.slice(0, doze);
  console.log(categories);

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
              onClick={ () => setFilterByCategory(pathname, a.strCategory) }
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
              <img
                data-testid={ `${index}-card-img` }
                src={ result.strMealThumb ? result.strMealThumb : result.strDrinkThumb }
                alt={ result.strMeal ? result.strMeal : result.strDrink }
              />
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
