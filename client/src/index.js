import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { Outlet, Link, withRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Personen from './routes/personen';
import LoginRoute from './routes/loginRoute';
import RegisterRoute from './routes/registerRoute';
//import { Login,PersonSelectList, } from './components';
import * as serviceWorker from './serviceWorker';
import Dashboard from 'components/dashboard'





ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {<App />} />
            
            <Route path="/personen" element={<Personen />} />
            
        </Routes>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
