import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
// import ActionCable from 'actioncable'

import MultiGame from "../components/MultiGame"
import MultiControlPanel from "../containers/MultiControlPanel"

export default class MultiGameRoom extends Component {


  state={
    playerOne: 0,
    playerTwo: 0,
    currentGame: 0,
    activeGame: false,
    players:[]
  }

  componentDidMount=()=>{
    debugger
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
    },()=>this.startFetch())
  }

  startFetch=()=>{
    fetch(`http://localhost:3000/api/v1/games/${this.props.routePath}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        active: this.state.activeGame
      })
    })
  }

  renderStartButton=()=>{
    this.setState({
      activeGame: false
    })
  }

  handleGameData = (data) => {
    console.log(data)
    debugger
    this.setState({
      currentGame: this.state.currentGame +1,
      activeGame: data.game.active
    })
  }



  render(){
    return(
      <div className="gameroom">
        <div id="gameboard">
          {this.state.activeGame? <MultiGame
                                                increaseScore={this.increaseScore}
                                                renderStartButton={this.renderStartButton}
                                                key={this.state.currentGame}
                                                /> : null}
        </div>
        <MultiControlPanel gameInfo={this.state} startGame={this.startGame}/>
        <ActionCable
          channel={{ channel: 'GameChannel', gameId: this.props.routePath }}
          onReceived={this.handleGameData}
        />
      </div>
    )
  }
};
