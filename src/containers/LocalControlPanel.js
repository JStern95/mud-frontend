import React from 'react';
import Scoreboard from "../components/Scoreboard"

const LocalControlPanel = (props)=>{
  // debugger
  return(
    <div className="controls">
      <Scoreboard playersScore={props.gameInfo}/>
      <hr/>
      <br/>
      <h3 className="eight-bit-font">Player One Controls:</h3>
        <ul>
          <li>Forward: W Key</li>
          <li>Rotate Right: D Key</li>
          <li>Rotate Left: A Key</li>
          <li>Shoot: Left Shift</li>
        </ul>
      <h3 className="eight-bit-font">Player Two Controls:</h3>
        <ul>
          <li>Forward: Up Arrow</li>
          <li>Rotate Right: Right Arrow</li>
          <li>Rotate Left: Left Arrow</li>
          <li>Shoot: Forward Slash</li>
        </ul>
      {props.gameInfo.activeGame? null : <button onClick={props.startGame} className="startButton">Start Game</button>}
    </div>
  )
}

export default LocalControlPanel
