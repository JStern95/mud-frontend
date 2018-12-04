import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';

import GamesPlayedRanking from '../containers/GamesPlayedRanking'
import GamesWonRanking from '../containers/GamesWonRanking'
import GamesLostRanking from '../containers/GamesLostRanking'

export default class Rankings extends Component {

  state={
    allUsers:[]
  }

  componentDidMount=()=>{
    fetch("http://localhost:3000/api/v1/users")
      .then(res=>res.json())
      .then(parsed=>{
        debugger
        this.setState({
          allUsers: parsed
        }, ()=>console.log(this.state))
      })
  }

    handleGameData = (data) => {
      console.log(data)
      this.setState({
        allUsers:data
      })
    }

    sortByPlays=()=>{
      let sortedUsers=this.state.allUsers.sort(function(a, b) {
        return b.games_played - a.games_played})
      return sortedUsers.map(user=><li>{user.username}'s games played: {user.games_played}</li>)
    }

    sortByLoses=()=>{
      let sortedUsers=this.state.allUsers.sort(function(a, b) {
        return b.games_lost - a.games_lost})
      return sortedUsers.map(user=><li>{user.username}'s games lost: {user.games_lost}</li>)
    }

    sortByWins=()=>{
      let sortedUsers=this.state.allUsers.sort(function(a, b) {
        return b.games_won - a.games_won})
      return sortedUsers.map(user=><li>{user.username}'s games won: {user.games_won}</li>)
    }

  render() {
    return (
      <>
      <h1 className="eight-bit-font">Global Rankings</h1>
        <GamesPlayedRanking gamesPlayed={this.sortByPlays()}/>
        <GamesWonRanking gamesWon={this.sortByWins()}/>
        <GamesLostRanking gamesLost={this.sortByLoses()}/>
      <ActionCable
        channel={{ channel: 'UserChannel' }}
        onReceived={this.handleGameData}
      />
      </>
    );
  }
};
