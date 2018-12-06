import React from 'react';

const GamesPlayedRanking = (props)=>{

  return(
    <div className="obsessiveboard rankings-card">
    <center><h2 className="eight-bit-font rankings-title yellow-font">Obsessiveboard</h2></center>
    <ol>
      {props.gamesPlayed}
    </ol>
    </div>
  )
}

export default GamesPlayedRanking
