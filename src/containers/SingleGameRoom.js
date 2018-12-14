import React, { Component } from 'react';

import SingleGame from "../components/SingleGame"
import SingleControlPanel from "../containers/SingleControlPanel"
import { AppConsumer } from '../context/AppContext';

let value

export default class SingleGameRoom extends Component {
  static contextType = AppConsumer;

  state={
    currentGame: 0,
    activeGame: false
  }

  componentWillMount=()=>{
    value = this.context
  }

  componentDidUpdate=()=>{
    value = this.context
  }

  increaseScore=() =>{
    debugger
    fetch('http://dkt-api.herokuapp.com/api/v1/users/'+value.user.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
            username: value.user.username,
            games_won: value.user.games_won+1,
            games_played: value.user.games_played+1
        })
      }).then(response => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
        .then((JSONResponse) => {
          debugger
          if (JSONResponse.message === "Please log in") {
          } else{
            debugger
            value.dispatch({
                type: 'SET_CURRENT_USER',
                payload: JSONResponse
              })
          }
        })
  }

  decreaseScore=() =>{
    debugger
    fetch('http://dkt-api.herokuapp.com/api/v1/users/'+value.user.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
            username: value.user.username,
            games_lost: value.user.games_lost+1,
            games_played: value.user.games_played+1
        })
      }).then(response => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
        .then((JSONResponse) => {
          debugger
          if (JSONResponse.message === "Please log in") {
          } else{
            debugger
            value.dispatch({
                type: 'SET_CURRENT_USER',
                payload: JSONResponse
              })
          }
        })
  }

  startGame=()=>{
    this.setState({
      currentGame: this.state.currentGame +1,
      activeGame: true
    })
  }

  renderStartButton=()=>{
    this.setState({
      activeGame: false
    })
  }

  render(){
    return(
      <div className="gameroom">
        <div id="gameboard">
          {this.state.activeGame? <SingleGame increaseScore={this.increaseScore} decreaseScore={this.decreaseScore} renderStartButton={this.renderStartButton} key={this.state.currentGame}/> : null}
        </div>
        <SingleControlPanel gameInfo={this.state} startGame={this.startGame}/>
      </div>
    )
  }
};
