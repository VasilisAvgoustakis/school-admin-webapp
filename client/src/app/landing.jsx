import React from 'react';
import { Login, Register} from '../components';
import axios from 'axios';
import { Outlet } from "react-router-dom";
import logo from "../resources/pictures/logo.png"

/**
 * 'Landing' is a simple functional React component 
 *  which holds all Login/Register functionality components and 
 *  forms the landing page for users.
 * @returns html code containg all components for loggin in and registering.
 */


function Landing() {
  axios.defaults.withCredentials = true;

  return (    
    <div className="App">

      <h2>School Database</h2>

      <div id='logo'>
        <img  src= {logo} alt="FSX Logo" style={({width:"250px"})} />
      </div>

      <div id='login-cont'>
        <Login />
      </div>

      <div id='register-cont'>
        <br></br>
        <Register />
        <Outlet />
      </div>

    </div>
  );
}

export default Landing;