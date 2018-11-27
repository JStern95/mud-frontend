import React, { Component } from 'react';
import LocalGame from "../components/LocalGame"
import ControlPanel from "../containers/ControlPanel"

export default class Game extends Component {

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

  render() {
    let routePath = this.props.match.params.gameId
    return (
      <div className="gameroom">
        <div id="gameboard">
          {this.state.activeGame? routePath==="local"?<LocalGame increaseScore={this.increaseScore} renderStartButton={this.renderStartButton} key={this.state.currentGame}/>:<p>Hi</p> : null}
        </div>
        <ControlPanel gameInfo={this.state} startGame={this.startGame}/>
      </div>

    );
  }
};
