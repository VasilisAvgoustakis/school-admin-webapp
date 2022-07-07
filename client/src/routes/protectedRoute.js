import { SERVER_IP } from '../globalFunctions';
import React,{useEffect, useState} from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import axios from 'axios';
import { Sleep } from "../globalFunctions";
import Redirect from "./redirect";


function ProtectedRoute({children}, ...props) {

  const [loading, setLoading] = useState(true);
  var strBoolean = localStorage.getItem("isAuthenticated");
  var [isAuthenticated, setAuth] = useState();


  async function LoginSessionQuery(session_id){
    return (
      await axios.post(`http://${SERVER_IP}:3000/sessionId`, {
          params: {
              session_id: session_id,
          },
          }).then((res) => {
            if(res){
              //console.log(res.data)
              let serverReturnId = res.data
      
              if(serverReturnId === sessionStorage.getItem("LoginToken")){
                setAuth(true);
              }
              
            }else{
              
            }
          })
          )
  }

  useEffect(() => {

    if(!isAuthenticated){
      LoginSessionQuery(sessionStorage.getItem("LoginToken"))
    }
  }, [])
  


  
      
  return (
    //console.log(props.isAuthenticated),
    //isAuthenticated ? children :  <Navigate to= '/'/>
    isAuthenticated ? children : <Redirect isAuthenticated={isAuthenticated}/>
  
  )
}


export default ProtectedRoute;

