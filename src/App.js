import React, { Component } from 'react';
// import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom';

import Home from "./pages/Home"
import Lobby from "./pages/Lobby"
import Error from "./pages/Error"
import Game from "./pages/Game"
import Login from "./components/Login"
import SignUp from "./components/SignUp"


class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/lobby" component={Lobby}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/games" render={()=><Redirect to="/lobby"/>} />
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
