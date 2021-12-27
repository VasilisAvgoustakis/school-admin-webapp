import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Personen} from './routes/personen';
import * as serviceWorker from './serviceWorker';
import { Register } from './components/register';

ReactDOM.render(
    <BrowserRouter>
        
        <Routes>
            <Route path="register" element={<Register />} />
            <Route path="/" element={<App />}>
                
                <Route path="personen" element={<Personen />} />
            </Route>
        </Routes>
    </BrowserRouter>
    , 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
