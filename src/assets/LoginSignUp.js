import React, { Component } from 'react';

import Login from "../components/Login"
import SignUp from "../components/SignUp"

export default class LoginSignUp extends Component {

  state={
    displayLogin: false,
    displaySignUp: false
  }

  componentDidMount=()=>{
    console.log()
    if (this.props.match.url === "/lobby") {
      this.setState({
        displayLogin: true,
        displaySignUp: false
      })
    } else if (this.props.match.url === "/signup") {
      this.setState({
        displaySignUp: true,
        displayLogin: false
      })
    }
    debugger
  }

  flipTheSwitch =()=>{
    this.setState({
      displayLogin: !this.state.displayLogin,
      displaySignUp: !this.state.displaySignUp,
    })
  }

  render() {
    return (
      <>
        {this.state.displayLogin? <Login flipTheSwitch={this.flipTheSwitch}/> : <SignUp flipTheSwitch={this.flipTheSwitch}/>}
      </>
    );
  }
};
