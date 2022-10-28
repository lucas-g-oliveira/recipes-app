export const doneRecipe = (recipe) => {
  localStorage.setItem('doneRecipes', JSON.stringify({
    id: recipe.idMeal
  }))
}