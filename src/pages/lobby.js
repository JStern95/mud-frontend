import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
    debugger
    return this.state.games.map(game=><li>{game.title}</li>)
  }

  render() {
    return (
      <div className="gamelist">
        <h1>Lobby</h1>
        <ul>
          <li><NavLink to={"/games/local"}>Local Game</NavLink></li>
          {this.state.games.length === 0 ? null : this.mapGames()}
        </ul>
      </div>
    );
  }
};
