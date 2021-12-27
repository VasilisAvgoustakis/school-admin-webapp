import React, {useState, useEffect, setRole} from 'react';
import { Login,PersonSelectList} from '../components';
import axios from 'axios';
import { Outlet, Link, withRouter } from "react-router-dom";

function App() {

  /**
   * To send the information from the client application to the server 
   * application to see a session exists, we have to be very careful. 
   * The XMLHttpRequest from a different domain cannot set cookie values 
   * for their domain unless withCredentials is set to true before making 
   * the request.
   */
  axios.defaults.withCredentials = false;

  // Check already logged users using Axios.
  // a useEffect to run whenever we refresh the page.
  // In here “SET ROLE” changes the active roles within the current session.
  function useEffect(){
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`).then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
      }
    });
  };


  return (
    <div className="App">
      <h1>FSX_APP</h1>
      <nav 
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        
        <Link to="/personen">Personen</Link> |{" "}
        
      </nav>
      <Outlet />
      
      <Login />
    
      
      
      
      
      
    </div>
  );
}



export default App;