import React, {useState, useEffect, setRole} from 'react';
import { Login,PersonSelectList, Register} from '../components';
import axios from 'axios';
import { Outlet, Link, withRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Personen} from '../routes/personen';


const Dashboard = () => <h1>Personen (Private)</h1>;

function App() {


    // Check already logged users using Axios.
  // a useEffect to run whenever we refresh the page.
  // In here “SET ROLE” changes the active roles within the current session.
  useEffect(() => {
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`).then((response) => {
      console.log("effect")
      if (response.data.loggedIn == true) {
        setRole(response.data[0].user.role);
        console.log(response.data.loggedIn);
        
        
      }else{
        console.log(response.data.loggedIn);
        //console.log(response.data[0].user.role);
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <h1>FSX_APP</h1>
        <Link to= '/login' > Anmelden </Link>
        <br></br>
        <Link to= '/register' > Registrieren  </Link>
      
        <Routes>
          <Route path= "/login" element={<Login />} />
          <Route path= "/register" element={<Register />} />
          <Route path="/personen" element={<Personen />} />
            
        </Routes>
    </BrowserRouter>
      
    </div>
  );
}



export default App;