import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../contextApi/AppContext';
import Footer from '../components/Footer';

function Meals() {
  const { mealsResults } = useContext(AppContext);
  const doze = 12;
  const mealsMap = mealsResults.slice(0, doze);

  return (
    <div>
      <Header />
      <div>
        {
          mealsResults.length === 1
          && <Redirect to={ `/meals/${mealsResults[0].idMeal}` } />
        }
        {
          mealsMap.map((meal, index) => (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
