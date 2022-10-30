export const saveFavorites = (recipe) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
};

export const getFavorites = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
