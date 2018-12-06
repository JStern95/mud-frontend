import React from 'react';

const GamesLostRanking = (props)=>{

  return(
    <div className="loserboard rankings-card">
      <center><h2 className="eight-bit-font rankings-title yellow-font negative-top-margin">Loserboard</h2></center>
      <div className="list-container">
        <ol>
          {props.gamesLost}
        </ol>
      </div>
    </div>
  )
}

export default GamesLostRanking
