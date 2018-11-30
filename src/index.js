import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';

import { AppProvider } from "./context/AppContext"

ReactDOM.render(
  <ActionCableProvider url={"ws://localhost:3000/api/v1/cable"}>
      <AppProvider>
        <App />
      </AppProvider>
    </ActionCableProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
