import React from 'react';

const GamesPlayedRanking = (props)=>{

  return(
    <div className="obsessiveboard rankings-card">
    <center><h2 className="eight-bit-font rankings-title yellow-font negative-top-margin">Obsessiveboard</h2></center>
    <div className="list-container">
    <ol>
      {props.gamesPlayed}
    </ol>
    </div>
    </div>
  )
}

export default GamesPlayedRanking
