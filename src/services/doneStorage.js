export const saveDoneRecipe = () => {
  localStorage.setItem('doneRecipes', JSON.stringify([{
    id: 'id-da-receita',
    type: 'meal-ou-drink',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: 'array-de-tags-da-receita-ou-array-vazio',
  }]));
};

export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));
