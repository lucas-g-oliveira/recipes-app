import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../contextApi/AppContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

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
        {/* {
          drinksMap.map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          ))
        } */}
      </div>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
