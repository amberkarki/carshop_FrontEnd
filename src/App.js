import React from 'react';
import logo from './logo.svg';
import './App.css';

import Carlist from './components/Carlist';

function App() {
  return (
    <div className="App">
      <header className= "App-header">
        <h2>Car Shop</h2>
      </header>
      <br/>
      <hr />
    <Carlist />
    </div>
  );
}

export default App;
