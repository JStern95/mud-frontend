import React, { Component } from 'react';

import LocalGame from "../components/LocalGame"
import LocalControlPanel from "../containers/LocalControlPanel"

export default class LocalGameRoom extends Component {

  state={
    playerOne: 0,
    playerTwo: 0,
    currentGame: 0,
    activeGame: false
  }

  increaseScore=(player) =>{
    debugger
    this.setState({
      [player.key]: this.state[player.key] + 1
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
          {this.state.activeGame? <LocalGame increaseScore={this.increaseScore} renderStartButton={this.renderStartButton} key={this.state.currentGame}/> : null}
        </div>
        <LocalControlPanel gameInfo={this.state} startGame={this.startGame}/>
      </div>
    )
  }
};
