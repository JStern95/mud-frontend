import React from 'react';

const GamesWonRanking = (props)=>{

  return(
    <div className="leaderboard rankings-card">
    <center><h2 className="eight-bit-font rankings-title pink-font negative-top-margin">Leaderboard</h2></center>
    <div className="list-container">
    <ol>
      {props.gamesWon}
    </ol>
    </div>
    </div>
  )
}

export default GamesWonRanking
