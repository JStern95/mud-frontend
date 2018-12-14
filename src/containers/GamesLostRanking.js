import React from 'react';

const GamesLostRanking = (props)=>{

  return(
    <div className="loserboard rankings-card">
    <div className="ranking-title">
      <h2 className="eight-bit-font rankings-title yellow-font negative-top-margin">Loserboard</h2>
    </div>
      <div className="list-container">
        <ol>
          {props.gamesLost}
        </ol>
      </div>
    </div>
  )
}

export default GamesLostRanking
