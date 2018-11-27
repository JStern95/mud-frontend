import React from 'react';

const Scoreboard = (props) =>{
  return(
    <>
      <h1 id="scoreboard-header">Scoreboard:</h1>
      <h2>Player One: {props.playersScore.playerOne}</h2>
      <h2>Player Two: {props.playersScore.playerTwo}</h2>
    </>
  )
}

export default Scoreboard
