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
  .getItem('inProgressRecipes')) ?? { meals: {}, drinks: {} };

export const addProgressToRecipe = (page, recipeId) => {
  const updateProgress = getInProgressRecipe();
  const test = JSON.stringify(updateProgress).includes(recipeId);
  if (!test) {
    updateProgress[page][recipeId] = [];
    saveInProgressRecipe(updateProgress);
  }
};
