// import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import AppContext from '../contextApi/AppContext';
// import Footer from './Footer';

// // function RecipesDetails() {
// //   const { selectedRecipe } = useContext(AppContext);
// //   const { location: { pathname } } = useHistory();

//   // handleClick --> target --> trazer id --> vamos colocar esse id na url --> fetch com url
// /*   const [selectedRecipe, setSelectedRecipe] = useState('')
//   handleClick({target}){
//         setSelectedRecipe(target);
//     }
//   }; */

//   // useEffect(() => {
//   //   const fetchDetail = async () => {
//   //     if (selectedRecipe.key ==) {

//   //     } else {

//   //     }
//   //   };
//   //   fetchTudo();
//   // });

//   return (
//     <div>
//       <div>
//         {
//           resultsMap.map((result, index) => (
//             <div
//               key={ result.idMeal ? result.idMeal : result.idDrink }
//               data-testid={ `${index}-recipe-card` }
//             >
//               <img
//                 data-testid={ `${index}-card-img` }
//                 src={ result.strMealThumb ? result.strMealThumb : result.strDrinkThumb }
//                 alt={ result.strMeal ? result.strMeal : result.strDrink }
//               />
//               <p
//                 data-testid={ `${index}-card-name` }
//               >
//                 { result.strMeal ? result.strMeal : result.strDrink }
//               </p>
//             </div>
//           ))
//         }
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Recipes;
