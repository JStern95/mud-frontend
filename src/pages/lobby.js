import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppConsumer } from '../context/AppContext';

import Register from "../containers/Register"

export default class Lobby extends Component {

  logout =()=>{
    localStorage.removeItem('jwt')
    window.location.reload()
  }

  render() {
    return (
      <div className="lobby">
        <h1 className="eight-bit-font lobby-header">Lobby</h1>

              <div className="lobby-container">

                <div className="cellphone-container">
                  <div className="game">
                    <img className="game-img" src="https://i.imgur.com/CoFXu7L.png"></img>
                    <div className="text-game-cont">
                          <h1 className="eight-bit-font white-font no-margin-bottom game-title">Local Comp</h1>
                          <p className="game-description white-font">Sit with a friend and beat them up in this local pvp game! Just remember: <br/> DON'T KILL THEM!</p>
                          <br/>
                            <NavLink to={"/games/local"}><button className="eight-bit-font play-btn">Play</button></NavLink>
                    </div>
                  </div>
                </div>

                <div className="cellphone-container">
                <AppConsumer>
                  {context=>{
                    return(!context.loggedIn ? <Register /> :
                  <div className="game">
                    <img className="game-img" src="https://i.imgur.com/C29msA4.png"></img>
                    <div className="text-game-cont">
                      <h1 className="eight-bit-font white-font no-margin-bottom game-title">Single Ranked</h1>
                      <p className="game-description white-font">Play against 25 computer enemies in a final showdown!</p>
                      <br/>
                      <NavLink to={"/games/single"}><button className="eight-bit-font play-btn">Play</button></NavLink>
                    </div>
                  </div>
                )}}
          </AppConsumer>
                </div>

                <div className="cellphone-container">
                  <div className="game">
                    <img className="game-img" src="https://i.imgur.com/JODt1zc.png"></img>
                    <div className="text-game-cont">
                          <h1 className="eight-bit-font white-font no-margin-bottom game-title">Rankings</h1>
                          <p className="game-description white-font">See the biggest winners... and losers. Will you make it to the top?</p>
                          <br/>
                            <NavLink to={"/rankings"}><button className="eight-bit-font play-btn">View</button></NavLink>
                    </div>
                  </div>
                </div>

              </div>
              <AppConsumer>
                {context=> !context.loggedIn ? null :<button onClick={this.logout} className="logout white-font eight-bit-font">Logout</button>}
            </AppConsumer>
</div>
    );
  }
};

//
//   { (context) => (
//   <p>Did I pass?: {context.test}</p>
//   )}
// </AppConsumer>
