import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../contextApi/AppContext';
import Footer from '../components/Footer';

function Drinks() {
  const { drinksResults } = useContext(AppContext);
  const doze = 12;
  const drinksMap = drinksResults.slice(0, doze);

  return (
    <div>
      <Header />
      <div>
        {
          drinksResults.length === 1
            && <Redirect to={ `/drinks/${drinksResults[0].idDrink}` } />
        }
        {
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
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
