import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppConsumer } from '../context/AppContext';
// this.props.context
export default class Login extends Component {

  state={
    username: "",
    password: ""
  }

  handleChange = e =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      username: "",
      password: ""
    },()=>console.log(this.state))
  }

  render() {

    return (
      <>
      <div>Hey Bitch</div>
      <form onSubmit={this.handleSubmit}>
      <input type="text" onChange={this.handleChange} name="username" placeholder="Username..."/>
      <br/>
      <input type="password" onChange={this.handleChange} name="password" placeholder="Password..."/>
      <br/>
      <input type="submit"/>
      </form>
      <NavLink to={"/signup"}><button>Register</button></NavLink>
      </>
    );
  }
};
