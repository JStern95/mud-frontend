import React from 'react';

const GamesLostRanking = (props)=>{

  return(
    <div className="loserboard rankings-card">
      <center><h2 className="eight-bit-font rankings-title yellow-font">Loserboard</h2></center>
      <ol>
        {props.gamesLost}
      </ol>
    </div>
  )
}

export default GamesLostRanking
