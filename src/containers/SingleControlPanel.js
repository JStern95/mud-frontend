import React from 'react';
import { NavLink } from 'react-router-dom'

import SingleScoreboard from "../components/SingleScoreboard"

const SingleControlPanel = (props)=>{
  // debugger
  return(
    <div className="controls">
      <SingleScoreboard playersScore={props.gameInfo}/>
      <hr/>
      <br/>
      <h3 className="eight-bit-font yellow-font h3-increase">Player One Controls:</h3>
        <ul>
          <li>Forward: W Key</li>
          <li>Rotate Right: D Key</li>
          <li>Rotate Left: A Key</li>
          <li>Shoot: Left Shift</li>
        </ul>
      <h3 className="eight-bit-font h3-increase">Objective:</h3>
        <p className="tab">Forget the rules! Kill everything!
        <br/>
        Twenty-five enemy ships have spawned
        <br/>
        and are gunning for you. You have 20
        <br/>
        seconds to survive, or, better yet, kill
        <br/>
        them all. Starting health is doubled!
        </p>
      {props.gameInfo.activeGame? null :
        <>
        <div className="game-buttons">
          <button onClick={props.startGame} className="start-button eight-bit-font">Start</button>
          <br/>
          <NavLink to={"/lobby"}><button className="go-lobby-button eight-bit-font white-font">Lobby</button></NavLink>
        </div>
        </>
      }
    </div>
  )
}

export default SingleControlPanel
