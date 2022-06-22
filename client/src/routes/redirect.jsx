import React,{useEffect, useState} from "react";
import axios from 'axios';
import { Route, Navigate, Outlet } from "react-router-dom";
import { Sleep } from "../globalFunctions";



function Redirect({isAuthenticated}) {

    useEffect(() => {
        
        Sleep(5000).then((resolve)=>{
            //console.log(document.getElementById('person-screen'))
            if(!document.getElementById('person-screen'))window.location.href = "/";
        })
        
      }, [])

    return (
      
      <div>
        <p>Nicht eingeloggt oder Session expired! Redirectinng...</p>
                                    
     </div>
    );
  }

  export default Redirect;