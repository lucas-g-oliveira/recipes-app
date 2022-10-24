import React from 'react';
import Login from './components/Login';
import './App.css';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './contextApi/Provider';

function App() {
  return (
    <div className="meals">
      <span className="logo">Grupo-16</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <Login />
    </div>      
  );
}

export default App;
