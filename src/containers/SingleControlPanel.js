import React from 'react';
import SingleScoreboard from "../components/SingleScoreboard"

const SingleControlPanel = (props)=>{
  // debugger
  return(
    <div className="controls">
      <SingleScoreboard playersScore={props.gameInfo}/>
      <hr/>
      <br/>
      <h3 className="eight-bit-font">Player One Controls:</h3>
        <ul>
          <li>Forward: W Key</li>
          <li>Rotate Right: D Key</li>
          <li>Rotate Left: A Key</li>
          <li>Shoot: Left Shift</li>
        </ul>
      {props.gameInfo.activeGame? null : <button onClick={props.startGame} className="startButton">Start Game</button>}
    </div>
  )
}

export default SingleControlPanel
