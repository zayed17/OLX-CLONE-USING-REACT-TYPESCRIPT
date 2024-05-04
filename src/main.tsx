import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseContext } from './store/FirebaseContext';
import {firebaseApp} from './firebase/config'
import Context from './store/FirebaseContext';

ReactDOM.render(
  <firebaseContext.Provider value={firebaseApp}>
    <React.StrictMode>
      <Context>
      <App />
      </Context>
    </React.StrictMode>
  </firebaseContext.Provider>,
  document.getElementById('root')
);
