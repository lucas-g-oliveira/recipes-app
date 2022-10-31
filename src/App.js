import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Favorite from './pages/Favorite';
import Done from './pages/Done';
/* import MealDetails from './pages/MealDetails';
import DrinksDetails from './pages/DrinksDetails'; */
import RecipeDetails from './components/RecipeDetails';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    /*  <Provider>
       <BrowserRouter> */
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/meals/" component={ RecipeDetails } />
      <Route path="/drinks/" component={ RecipeDetails } />
      <Route
        exact
        path="/meals/{:id-da-receita/in-progress}"
        component={ RecipesInProgress }
      />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        component={ RecipesInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ Done } />
      <Route exact path="/favorite-recipes" component={ Favorite } />
    </Switch>
    /*   </BrowserRouter>
    </Provider> */
  );
}

export default App;
