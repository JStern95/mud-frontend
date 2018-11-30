import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppConsumer } from '../context/AppContext';
import { ActionCable } from 'react-actioncable-provider';

import NewGameModal from "../components/NewGameModal"

export default class Lobby extends Component {

  state = {
    games: [],
    makingGame: false
  };

  componentDidMount=()=>{
    fetch("http://localhost:3000/api/v1/games")
      .then(res=>res.json())
      .then(parsed=>{
        this.setState({games: parsed})
      })
  }

  handleReceivedGame = response => {
    const { game } = response;
    this.setState({
      games: [...this.state.games, game]
    });
  };

  mapGames = ()=> {
    return this.state.games.map(game=><li>{game.title}</li>)
  }

  render() {
    return (
      <div className="gamelist">
        <h1>Lobby</h1>
        <ul>
          <li><NavLink to={"/games/local"}>Local Game</NavLink></li>
          <br/>
          <AppConsumer>
            {context=>{
              return(!context.loggedIn ? <p> Please log in to see multiplayer games! </p> :
                <>
                  <NewGameModal />
                  {this.state.games.length === 0 ? null : this.mapGames()}
                </>
                    )}}
              </AppConsumer>
              <ActionCable
                channel={{ channel: 'GamesChannel' }}
                onReceived={this.handleReceivedGame}
              />
        </ul>
      </div>
    );
  }
};

//
//   { (context) => (
//   <p>Did I pass?: {context.test}</p>
//   )}
// </AppConsumer>
