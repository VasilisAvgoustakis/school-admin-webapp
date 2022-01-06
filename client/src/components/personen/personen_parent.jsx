import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/dashboard.css';








export function Personen() {
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
    
    <div className="main-content-container">
      
      <PersonSelectList />
      
    </div>
  );
}



export default Personen;