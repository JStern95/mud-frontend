import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';

import Home from "./pages/home"
import Lobby from "./pages/lobby"
import Error from "./pages/error"
import Game from "./pages/game"


class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/games" component={Lobby} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/rules" component={Home} />
            <Route path="/games/:gameId" component={Game} />
            <Route component={Error} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
