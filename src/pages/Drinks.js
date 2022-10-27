import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../contextApi/AppContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recepies';

function Drinks() {
  const { drinksResults } = useContext(AppContext);

  return (
    <div>
      <Header />
      <div>
        {
          drinksResults.length === 1
            && <Redirect to={ `/drinks/${drinksResults[0].idDrink}` } />
        }
      </div>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
