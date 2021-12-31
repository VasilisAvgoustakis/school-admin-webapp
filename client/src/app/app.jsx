import React, {useState, useEffect, setRole} from 'react';
import { Login,PersonSelectList, Register, Logout} from '../components';
import axios from 'axios';
import { Outlet, Link, withRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Personen} from '../routes/personen';



function App() {
  axios.defaults.withCredentials = true;
  
    // Check already logged users using Axios.
  // a useEffect to run whenever we refresh the page.
  // In here “SET ROLE” changes the active roles within the current session.
  // useEffect(() => {
  //   axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`).then((response) => {
  //     if (response.data.user) {
  //       //setRole(response.data.user[0].role);
  //       console.log(response.data)
  //     }
  //   });
  // }, []);



  return (
    <div className="App">
      <h1>FSX_APP</h1>
        <Logout />
        <Login />
        <br></br>
        <Register />
        <Outlet />
      
    </div>
  );
}



export default App;