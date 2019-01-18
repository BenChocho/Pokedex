import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./Components/Containers/Home";
import PokemonInfos from './Components/PokemonInfos';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/pokemon/:pokemonIndex" component={PokemonInfos}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
