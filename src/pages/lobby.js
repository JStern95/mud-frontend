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
        <h1><center><h1 className="eight-bit-font lobby-header">Lobby</h1></center></h1>
              <div className="container">
                <div className="cellphone-container">
                  <div className="movie">
                    <img className="movie-img" src="https://i.imgur.com/CoFXu7L.png"></img>
                    <div className="text-movie-cont">
                          <h1 className="eight-bit-font white-font no-margin-bottom">Local Comp</h1>
                      <div className="mr-grid">
                        <div className="col1">
                          <p className="movie-description white-font">Sit with a friend and beat them up in this local pvp game! Just remember: <br/> DON'T KILL THEM!</p>
                          <br/>
                          <center>
                            <NavLink to={"/games/local"}><button className="eight-bit-font play-btn">Play</button></NavLink>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cellphone-container">
                <AppConsumer>
                  {context=>{
                    return(!context.loggedIn ? <Register /> :
                  <div className="movie">
                    <img className="movie-img" src="https://i.imgur.com/C29msA4.png"></img>
                    <div className="text-movie-cont">
                          <h1 className="eight-bit-font white-font no-margin-bottom">Single Ranked</h1>
                      <div className="mr-grid">
                        <div className="col1">
                              <p className="movie-description white-font">Play against 25 computer enemies in a final showdown!</p>
                              <br/>
                              <center>
                                <NavLink to={"/games/single"}><button className="eight-bit-font play-btn">Play</button></NavLink>
                              </center>
                        </div>
                      </div>
                    </div>
                  </div>
                )}}
          </AppConsumer>
                </div>

                <div className="cellphone-container">
                  <div className="movie">
                    <img className="movie-img" src="https://i.imgur.com/JODt1zc.png"></img>
                    <div className="text-movie-cont">
                          <h1 className="eight-bit-font white-font no-margin-bottom">Rankings</h1>
                      <div className="mr-grid">
                        <div className="col1">
                          <p className="movie-description white-font">See the biggest winners... and losers. Will you make it to the top?</p>
                          <br/>
                          <center>
                            <NavLink to={"/rankings"}><button className="eight-bit-font play-btn">View</button></NavLink>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <button onClick={this.logout} className="logout white-font eight-bit-font">Logout</button>
</div>
    );
  }
};

//
//   { (context) => (
//   <p>Did I pass?: {context.test}</p>
//   )}
// </AppConsumer>
