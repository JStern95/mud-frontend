import React, { Component } from 'react';
import Popup from 'reactjs-popup'
import { NavLink, Redirect } from 'react-router-dom';

export default class NewGameModal extends Component {

  state={
    title: "",
    hasPassword: false,
    unSecurePassword: ""
  }

  handleCheckbox =(e)=>{
    this.setState({
      ...this.state,
      hasPassword: !this.state.hasPassword
    })
  }

  handleChange = e =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        game:{
          title: this.state.title,
          hasPassword: this.state.hasPassword,
          unSecurePassword: this.state.unSecurePassword
        }
      })
    }).then(res=>{
      if (res.ok) {
        debugger
        return res.json()
      } else {
        throw res
      }}).then(parsed=>{
        debugger
        window.location.href = 'http://localhost:3001/games/'+parsed.id
        // return <Redirect to={"/games/"+parsed.id}/>
      })
    e.target.reset()
  };


  render() {
    return (
      <Popup trigger={<button> Trigger</button>} position="right center"
        modal
        closeOnDocumentClick
      >
        <h1 className="eight-bit-font">Make a new Game!</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Game Title..." onChange={this.handleChange}/>
          <br/>
          <label>Password Protected?</label>
          <input type="checkbox" name="hasPassword" onChange={this.handleCheckbox}/>
          <br/>
          {this.state.hasPassword ? <input type="text" name="unSecurePassword" placeholder="UNSECURE Password" onChange={this.handleChange}/> : null}
          <input type="submit"/>
        </form>
      </Popup>
    );
  }
};
