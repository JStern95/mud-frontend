import React, { Component, createContext } from 'react';

export const AppContext = createContext()

export const AppConsumer = AppContext.Consumer

export class AppProvider extends Component {
  state = {
    user: null,
    loggedIn: false,
    authenticatingUser: false,
    failedLogin: false,
    error: null
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
