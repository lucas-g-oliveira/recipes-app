import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import Footer from './Footer';

function RecipesDetails() {
  const { location: { pathname } } = useHistory();
  const { setSelectedRecipe, selectedRecipe } = useContext(AppContext);
  console.log(selectedRecipe);
  // handleClick --> target --> trazer id --> vamos colocar esse id na url --> fetch com url
  /* setSelectedRecipe(pathname); */
  const way = pathname.replace('/meals/', '');
  const wayDrink = pathname.replace('/drinks/', '');

  useEffect(() => {
    const fetchDetail = async () => {
      const detailsMealsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${way}`;
      const detailsDrinksEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${wayDrink}`;
      let response;
      let key;
      console.log(pathname);
      if (pathname === `/meals/${way}`) {
        response = await fetch(detailsMealsEndPoint);
        key = 'meals';
      } else {
        response = await fetch(detailsDrinksEndPoint);
        key = 'drinks';
      }
      const data = await response.json();
      setSelectedRecipe(data[key]);
    };
    fetchDetail();
  }, [pathname, setSelectedRecipe, way, wayDrink]);

  // const setFilterByCategory = useCallback(async (pathname, categorie) => {
  //   let endpoint;
  //   let key;
  //   if (pathname === '/meals') {
  //     endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
  //     key = 'meals';
  //   } else {
  //     endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
  //     key = 'drinks';
  //   }

  //   const response = await fetch(endpoint);
  //   const data = await response.json();
  //   setResults(data[key]);
  // }, []);

  return (
    <div>
      <div>
        <p>Recipes Details</p>
      </div>
      <Footer />
    </div>
  );
}
export default RecipesDetails;
