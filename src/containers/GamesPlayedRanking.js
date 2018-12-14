import React from 'react';

const GamesPlayedRanking = (props)=>{

  return(
    <div className="obsessiveboard rankings-card">
      <div className="ranking-title">
        <h2 className="eight-bit-font rankings-title yellow-font negative-top-margin">Fanboard</h2>
      </div>
      <div className="list-container">
        <ol>
          {props.gamesPlayed}
        </ol>
      </div>
    </div>
  )
}

export default GamesPlayedRanking
