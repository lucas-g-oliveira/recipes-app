import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import Header from './Header';
import AppContext from '../contextApi/AppContext';
import Footer from './Footer';

function Recipes() {
  const { results, fetchMealsApi, fetchDrinksApi } = useContext(AppContext);
  const doze = 12;
  const { location: { pathname } } = useHistory();
  const resultsMap = results.slice(0, doze);

  useEffect(() => {
    const fetchTudo = async () => {
      if (pathname === '/meals') {
        fetchMealsApi();
      } else {
        fetchDrinksApi();
      }
    };
    fetchTudo();
  });

  return (
    <div>
      {/* <Header /> */}
      <div>
        {
          resultsMap.map((result, index) => (
            <Link
              to={ `${pathname}/${result.idMeal ? result.idMeal : result.idDrink}` }
              key={ result.idMeal ? result.idMeal : result.idDrink }
            >
              <div
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
            </Link>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
