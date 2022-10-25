import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../contextApi/AppContext';

function Meals() {
  const { mealsResults } = useContext(AppContext);

  return (
    <div>
      <Header />
      <div>
        {
          mealsResults.length === 1
            && <Redirect to={ `/meals/${mealsResults[0].idMeal}` } />
        }
        {
          mealsResults.map((meal) => (
            <p key={ meal.idMeal }>{meal.strMeal}</p>
          ))
        }
      </div>
    </div>
  );
}

export default Meals;
