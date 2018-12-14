import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';

import GamesPlayedRanking from '../containers/GamesPlayedRanking'
import GamesWonRanking from '../containers/GamesWonRanking'
import GamesLostRanking from '../containers/GamesLostRanking'
import { AppConsumer } from '../context/AppContext';

export default class Rankings extends Component {

  state={
    allUsers:[]
  }

  componentDidMount=()=>{
    fetch("https://dkt-api.herokuapp.com/api/v1/users")
      .then(res=>res.json())
      .then(parsed=>{
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
      return sortedUsers.map(user=><li className="white-font h3-increase">{user.username}'s games played: <span className="score">{user.games_played}</span></li>)
    }

    sortByLoses=()=>{
      let sortedUsers=this.state.allUsers.sort(function(a, b) {
        return b.games_lost - a.games_lost})
      return sortedUsers.map(user=><li className="white-font h3-increase">{user.username}'s games lost: <span className="score">{user.games_lost}</span></li>)
    }

    sortByWins=()=>{
      let sortedUsers=this.state.allUsers.sort(function(a, b) {
        return b.games_won - a.games_won})
      return sortedUsers.map(user=><li className="h3-increase">{user.username}'s games won: <span className="score">{user.games_won}</span></li>)
    }

    logout =()=>{
      localStorage.removeItem('jwt')
      window.location.href = "https://dkt-frontend.herokuapp.com/"
    }

  render() {
    return (
      <div className="rankings">
      <div className="rankings-header">
        <h1 className="eight-bit-font"><span className="pink-font">G</span>lobal <span className="yellow-font">R</span>ankings</h1>
      </div>
      <div className="rankings-container">
        <GamesPlayedRanking gamesPlayed={this.sortByPlays()}/>
        <GamesWonRanking gamesWon={this.sortByWins()}/>
        <GamesLostRanking gamesLost={this.sortByLoses()}/>
      </div>
      <div className="lobby-btn-wrapper">
        <NavLink to={"/lobby"}><button className="to-lobby-btn eight-bit-font" >Lobby</button></NavLink>
      </div>
      <ActionCable
        channel={{ channel: 'UserChannel' }}
        onReceived={this.handleGameData}
      />
      <AppConsumer>
        {context=> !context.loggedIn ? null :<button onClick={this.logout} className="logout white-font eight-bit-font">Logout</button>}
    </AppConsumer>
      </div>
    );
  }
};
