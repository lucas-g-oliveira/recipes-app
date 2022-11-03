export const saveDoneRecipe = (recipe) => {
  localStorage.setItem('doneRecipes', JSON.stringify(recipe));
};

export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));
