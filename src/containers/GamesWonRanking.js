import React from 'react';

const GamesWonRanking = (props)=>{

  return(
    <div className="leaderboard rankings-card">
    <center><h2 className="eight-bit-font rankings-title pink-font">Leaderboard</h2></center>
    <ol>
      {props.gamesWon}
    </ol>
    </div>
  )
}

export default GamesWonRanking
