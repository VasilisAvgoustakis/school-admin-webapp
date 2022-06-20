import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import Landing from './app/landing';
import axios from 'axios';
import { Outlet, Link, withRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation} from './components';
import * as serviceWorker from './serviceWorker';
import ProtectedRoute from './routes/protectedRoute'
import {withSession} from 'react-session';




ReactDOM.render(   
    <App />
  ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
