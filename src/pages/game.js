import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import LocalGameRoom from "../containers/LocalGameRoom"
import SingleGameRoom from "../containers/SingleGameRoom"

export default class Game extends Component {

  checkRoute=()=>{
    let routePath = this.props.match.params.gameId
    if (routePath === "local") {
      return <LocalGameRoom />
    } else if (routePath === "single") {
      return <SingleGameRoom />
    // }else if ((/^[0-9]+$/).test(routePath)) {
    //   return <MultiGameRoom routePath={routePath}/>
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
