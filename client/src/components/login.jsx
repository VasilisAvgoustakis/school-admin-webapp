import React, {useState, useEffect, setRole} from 'react';
import { Route, Navigate, Outlet } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { withSession } from 'react-session';
import { Sleep } from '../globalFunctions';
import "./stylesheets/app.css";





export function Login(props){

  // const { session, nextAction } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const [loginStatus, setLoginStatus] = useState("");
  const [message,setMessage] = useState("");

  //const [toDashboard, setToDashboard] = React.useState(false);

  const navigate = useNavigate();
  //const { loggedIn } = useAuth();

  async function LoginSessionQuery(session_id, username){
    return (
      await axios.post(`http://172.25.12.99:3000/sessionId`, {
          params: {
              session_id: session_id,
              userName: username
          },
          }))
    }


/**
 * To send the information from the client application to the server 
 * application to see a session exists, we have to be very careful. 
 * The XMLHttpRequest from a different domain cannot set cookie values 
 * for their domain unless withCredentials is set to true before making 
 * the request.
 */
  function login() {
    axios.defaults.crossDomain = true;
    axios.defaults.withCredentials = true;

    //check if the given username and pass corresponds to a registered user
    axios.post(`http://172.25.12.99:3000/login`, {
      username: username,
      password: password,
    }).then(
      
      (response)  => {
        //console.log(response)

        //if user does not exists the server sends a corresponding message
        if (response.data.message){
          setMessage(response.data.message);
        }else { 
          //make display message empty
          setMessage("")
          console.log("Session Id: " + response.data);
          //store session id in session storage
          sessionStorage.setItem("LoginToken", response.data);
          localStorage.setItem("isAuthenticated", true);
          window.location.href = "/dashboard";
          
        }
      
    })
  }


  return(
    <div>
        <h1>Anmelden</h1>
        <input 
          type="text" 
          placeholder="Benutzername..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br></br>
        
        <input 
          type="password" 
          placeholder="Passwort..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <button onClick={login}>
          Anmelden
        </button>
        <h1>{message}</h1>
    </div>   
  )
}