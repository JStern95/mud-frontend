import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
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
      window.location.href = "http://localhost:3001/"
    }

  render() {
    return (
      <div className="rankings">
      <center><h1><h1 className="eight-bit-font"><span className="pink-font">G</span>lobal <span className="yellow-font">R</span>ankings</h1></h1></center>
      <div className="rankings-container">
        <GamesPlayedRanking gamesPlayed={this.sortByPlays()}/>
        <GamesWonRanking gamesWon={this.sortByWins()}/>
        <GamesLostRanking gamesLost={this.sortByLoses()}/>
      </div>
      <center><NavLink to={"/lobby"}><button className="to-lobby-btn eight-bit-font" >Lobby</button></NavLink></center>
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
