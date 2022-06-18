import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './app/landing';
import axios from 'axios';
import { Outlet, Link, withRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation} from './components';
import * as serviceWorker from './serviceWorker';
import ProtectedRoutes from './routes/protectedRoutes'
import {withSession} from 'react-session';



// async function LoginSessionQuery(session_id, username){
//   return (
//     await axios.post(`http://172.25.12.99:3000/sessionId`, {
//         params: {
//             session_id: session_id,
//             userName: username
//         },
//         }))
//   }


// LoginSessionQuery(sessionStorage.getItem("LoginToken"), sessionStorage.getItem("userName"))
// .then((res) => {
//       if(res.data){
//         //console.log(res.data)
//         sessionStorage.setItem("customDashboardURL", res.data)
        
//       }else{
//             //window.location.href = "/"
//       }
//   }   
//   )


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {<Landing />} />
            <Route path='/dashboard'  element={<Navigation />} />
        </Routes>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
