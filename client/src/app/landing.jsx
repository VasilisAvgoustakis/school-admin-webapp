import React, {useState, useEffect, setRole} from 'react';
import { Login, Register, Logout} from '../components';
import axios from 'axios';
import { Outlet, Link, withRouter } from "react-router-dom";
import logo from "../resources/pictures/logo.png"




function Landing() {
  axios.defaults.withCredentials = true;

  return (    
    <div className="App">
      <h2>FSX Datenbank</h2>
      <div id='logo'>
        <img  src= {logo} alt="FSX Logo" style={({width:"250px"})} />
      </div>
      
        {/* <Logout /> */}
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