import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../contextApi/AppContext';

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
        {
          drinksResults.map((drink) => (
            <p key={ drink.idDrink }>{drink.strDrink}</p>
          ))
        }
      </div>
    </div>
  );
}

export default Drinks;
