import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './contextApi/Provider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Favorite from './pages/Favorite';
import Done from './pages/Done';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          {/* <Route exact path="/meals/:id-da-receita" component={} />
          <Route exact path="/drinks/:id-da-receita" component={} />
          <Route exact path="/meals/:id-da-receita/in-progress" component={} />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={} /> */}
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ Done } />
          <Route exact path="/favorite-recipes" component={ Favorite } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
