import React, { Component } from 'react';
import GameRoom from "../containers/GameRoom"

export default class Game extends Component {

  state={
    active: false
  }

  render() {
    return (
      <>
        <GameRoom />
      </>
    );
  }
};
