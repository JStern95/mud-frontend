import React, { Component } from 'react';

import { API_LINK } from "../constants"

export default class Lobby extends Component {

  state = {
    games: [],
  };

  componentDidMount=()=>{
    fetch("http://localhost:3000/api/v1/games")
      .then(res=>res.json())
      .then(parsed=>{
        this.setState({games: parsed})
      })
  }

  mapGames = ()=> {
    return this.state.games.map(game=><li>{game.name}</li>)
  }

  render() {
    return (
      <div className="gamelist">
        <h1>Lobby</h1>
        <ul>
          {this.mapGames()}
        </ul>
      </div>
    );
  }
};
