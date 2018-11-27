import React, { Component } from 'react';
import LocalGame from "../components/LocalGame"
import Scoreboard from "../components/Scoreboard"

const GameRoom = (props) =>{
  return(
    <div className="gameroom">
      <div id="gameboard">
        {props.routePath==="local"?<LocalGame/>:<p>Hi</p>}
      </div>
      <Scoreboard />
    </div>
  )
}

export default GameRoom
        // <div className="gameroom">
          // <div className="gameboard">
