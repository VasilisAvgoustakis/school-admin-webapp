import React, {useState, useEffect, setRole} from 'react';
import { Login, Register, Logout} from '../components';
import axios from 'axios';
import { Outlet, Link, withRouter } from "react-router-dom";






function Landing() {
  axios.defaults.withCredentials = true;

  

  return (
    
    <div className="Landing">
      <h1>FSX_APP</h1>
        <Logout />
        <Login />
        <br></br>
        <Register />
        <Outlet />
    </div>
  );
}


export default Landing;