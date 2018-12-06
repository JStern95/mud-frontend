import React from 'react';
import { NavLink } from 'react-router-dom'

import Scoreboard from "../components/Scoreboard"

const LocalControlPanel = (props)=>{
  // debugger
  return(
    <div className="controls">
      <Scoreboard playersScore={props.gameInfo}/>
      <hr/>
      <br/>
      <h3 className="eight-bit-font yellow-font h3-increase">Player One Controls:</h3>
        <ul>
          <li>Forward: W Key</li>
          <li>Rotate Right: D Key</li>
          <li>Rotate Left: A Key</li>
          <li>Shoot: Left Shift</li>
        </ul>
      <h3 className="eight-bit-font pink-font h3-increase">Player Two Controls:</h3>
        <ul>
          <li>Forward: Up Arrow</li>
          <li>Rotate Right: Right Arrow</li>
          <li>Rotate Left: Left Arrow</li>
          <li>Shoot: Forward Slash</li>
        </ul>
      <h3 className="eight-bit-font h3-increase">Objective:</h3>
        <p className="tab">You have 20 seconds to maximize damage
        <br/>
        to your opponent. If you want to win,
        <br/>
        make sure you have more health than
        <br/>
        your opponent when the timer stops!
        <br/>
        But remember, don't kill them!
        </p>
        {props.gameInfo.activeGame? null :
          <div className="game-buttons">
            <button onClick={props.startGame} className="start-button eight-bit-font">Start</button>
            <br/>
            <NavLink to={"/lobby"}><button className="go-lobby-button eight-bit-font white-font">Lobby</button></NavLink>
          </div>
        }
      </div>
  )
}

export default LocalControlPanel
