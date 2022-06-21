import React,{useEffect, useState} from "react";
import axios from 'axios';
import { Route, Navigate, Outlet } from "react-router-dom";
import { Sleep } from "../globalFunctions";



function Redirect({isAuthenticated}) {

    useEffect(() => {
        console.log(isAuthenticated)
        Sleep(3000).then((resolve)=>{
            if(!isAuthenticated)window.location.href = "/";
            
        })
        
      }, [])

    return (
      
      <div>
        <p>Nicht eingeloggt oder Session expired! Redirectinng...</p>
                                    
     </div>
    );
  }

  export default Redirect;