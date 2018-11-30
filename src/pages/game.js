import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import LocalGameRoom from "../containers/LocalGameRoom"
import MultiGameRoom from "../containers/MultiGameRoom"

export default class Game extends Component {

  checkRoute=()=>{
    let routePath = this.props.match.params.gameId
    if (routePath === "local") {
      return <LocalGameRoom />
    } else if ((/^[0-9]+$/).test(routePath)) {
      return <MultiGameRoom />
    } else {
      alert("Not a valid room")
      return <Redirect to="/lobby"/>
    }
  }


  render() {
    return (
      <>
      {this.checkRoute()}
      </>
    );
  }
};
