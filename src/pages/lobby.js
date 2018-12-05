import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppConsumer } from '../context/AppContext';

import NewGameModal from "../components/NewGameModal"
import Register from "../containers/Register"

export default class Lobby extends Component {

  render() {
    return (
      <div className="lobby">
        <h1><center><h1 className="eight-bit-font lobby-header">Lobby</h1></center></h1>
              <div className="container">
                <div className="cellphone-container">
                  <div className="movie">
                    <img className="movie-img" src="https://i.imgur.com/CoFXu7L.png"></img>
                    <div className="text-movie-cont">
                          <h1 className="white-font">Local Comp</h1>
                      <div className="mr-grid">
                        <div className="col1">
                          <p className="movie-description">Sit with a friend and beat them up in this local pvp game! Just remember: <br/> DON'T KILL THEM!</p>
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
                          <h1 className="white-font">Single Ranked</h1>
                      <div className="mr-grid">
                        <div className="col1">
                              <p className="movie-description">Play against 25 computer enemies in a final showdown!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}}
          </AppConsumer>
                </div>

                <div className="cellphone-container">
                  <div className="movie">
                    <img className="movie-img" src="https://i.imgur.com/CoFXu7L.png"></img>
                    <div className="text-movie-cont">
                          <h1 className="white-font">Test</h1>
                      <div className="mr-grid">
                        <div className="col1">
                          <p className="movie-description">Sit with a friend and beat them up in this local pvp game! Just remember: <br/> DON'T KILL THEM!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
</div>
    );
  }
};

//
//   { (context) => (
//   <p>Did I pass?: {context.test}</p>
//   )}
// </AppConsumer>
