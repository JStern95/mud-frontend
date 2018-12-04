import React, { Component } from 'react';
// import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom';

import Home from "./pages/Home"
import Lobby from "./pages/Lobby"
import Error from "./pages/Error"
import Game from "./pages/Game"
import Rankings from "./pages/Rankings"
import Login from "./components/Login"
import SignUp from "./components/SignUp"

import { AppConsumer } from './context/AppContext';

let value

class App extends Component {
  static contextType = AppConsumer;

  componentWillMount = () => {
      value = this.context;
      console.log(value)
      fetch(`http://localhost:3000/api/v1/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then(response => response.json())
        .then((JSONResponse) => {
          // debugger
          if ("user" in JSONResponse) {
            value.dispatch({
                type: 'SET_CURRENT_USER',
                payload: JSONResponse.user
              })
          }
        })
      }

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
