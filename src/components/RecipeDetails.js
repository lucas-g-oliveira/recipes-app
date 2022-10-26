import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import Footer from './Footer';

function RecipesDetails() {
  const { selectedRecipe, setSelectedRecipe } = useContext(AppContext);
  const { location: { pathname } } = useHistory();
  console.log(pathname);
  // handleClick --> target --> trazer id --> vamos colocar esse id na url --> fetch com url
  /* setSelectedRecipe(pathname); */
  const way = pathname.replace('/meals/', '');

  useEffect(() => {
    const fetchDetail = async () => {
      const detailsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${way}`;
      const response = await fetch(detailsEndPoint);
      const data = await response.json();
      console.log(data);
    };
    fetchDetail();
  }, []);
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
