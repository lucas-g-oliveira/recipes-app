import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
/* import MealDetails from './pages/MealDetails';
import DrinksDetails from './pages/DrinksDetails'; */
import RecipeDetails from './components/RecipeDetails';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        path="/meals/:id/in-progress"
        component={ RecipesInProgress }
      />
      <Route
        path="/drinks/:id/in-progress"
        component={ RecipesInProgress }
      />
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
