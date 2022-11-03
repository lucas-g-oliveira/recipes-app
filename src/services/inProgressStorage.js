export const saveInProgressRecipe = (update) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(update));
  // localStorage.setItem('inProgressRecipes', JSON.stringify({
  //   drinks: {
  //     idDrink: ['lista - de - ingredientes - utilizados'],
  //   },
  //   meals: {
  //     idMeal: ['lista - de - ingredientes - utilizados'],
  //   },
  // }));
};

export const getInProgressRecipe = () => JSON.parse(localStorage
  .getItem('inProgressRecipes'));
