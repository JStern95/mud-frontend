import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from "./pages/Home"
import Lobby from "./pages/Lobby"
import Error from "./pages/Error"
import Game from "./pages/Game"
import Rankings from "./pages/Rankings"

import { AppConsumer } from './context/AppContext';

let value

class App extends Component {
  static contextType = AppConsumer;

  componentWillMount = () => {
    if (!!localStorage.getItem('jwt')) {
      value = this.context;
      fetch(`http://dkt-api.herokuapp.com/api/v1/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then(response => response.json())
        .then((JSONResponse) => {
          if ("user" in JSONResponse) {
            value.dispatch({
                type: 'SET_CURRENT_USER',
                payload: JSONResponse.user
              })
          }
        })
    }
  }

  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/lobby" component={Lobby}/>
            <Route exact path="/games" render={()=><Redirect to="/lobby"/>} />
            <Route path="/games/:gameId" component={Game} />
            <Route exact path="/rankings" component={Rankings} />
            <Route component={Error} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;

// value.dispatch({
//     type: 'SET_CURRENT_USER',
//     payload: JSONResponse.username
//   })
