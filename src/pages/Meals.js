import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../contextApi/AppContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recepies';

function Meals() {
  const { mealsResults } = useContext(AppContext);
  // const doze = 12;
  // const mealsMap = mealsResults.slice(0, doze);

  return (
    <div>
      <Header />
      <div>
        {
          mealsResults.length === 1
          && <Redirect to={ `/meals/${mealsResults[0].idMeal}` } />
        }
      </div>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
