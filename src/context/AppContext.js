import React, { Component, createContext } from 'react';

export const AppContext = createContext()

export const AppConsumer = AppContext.Consumer

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      debugger
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case 'AUTHENTICATING_USER':
      return { ...state, authenticatingUser: true }
    case 'AUTHENTICATED_USER':
      return { ...state, authenticatingUser: false }
    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    default:
      return state
  }
};

export class AppProvider extends Component {
  state = {
    user: {},
    loggedIn: false,
    authenticatingUser: false,
    failedLogin: false,
    error: null,
    dispatch: action => {
      this.setState(state => reducer(state, action));
      }
    }



  render() {
    return (
      <AppContext.Provider value={{...this.state}}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
};


// import { AppConsumer } from '../context/AppContext';
//
// <AppConsumer>
//   { (context) => (
//   <p>Did I pass?: {context.test}</p>
//   )}
// </AppConsumer>
