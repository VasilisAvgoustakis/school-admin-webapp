import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import * as serviceWorker from './serviceWorker';

/**
 * 'index.js' serves as an entrypoint for the webapp.
 * It renders the "App" React component by simple  JavaScript.
 */


ReactDOM.render(   
    <App />
  ,document.getElementById('root'));

// If you want the app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
