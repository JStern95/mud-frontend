import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class SignUp extends Component {
  render() {
    return (
      <>
        <div>Hey World</div>
        <NavLink to={"/login"}><button>Login</button></NavLink>
      </>
    );
  }
};
