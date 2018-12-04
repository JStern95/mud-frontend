import React from 'react';
import { AppConsumer } from '../context/AppContext';

const SingleScoreboard = () =>{
  return(
    <AppConsumer>
      {context=>{
        return(
        <>
          <h1 id="scoreboard-header">Scoreboard:</h1>
          <h2 className="eight-bit-font">{context.user.username}: {context.user.games_won}</h2>
        </>
      )
    }}
    </AppConsumer>
  )
}

export default SingleScoreboard
