import { SERVER_IP } from '../globalFunctions';
import React, {useState} from 'react';
import axios from 'axios';
import "../stylesheets/app.css";

/**
 * 'Login'is a functional React component containing all Login functionality. 
 *
 * @returns The html code with the Login Form.
 */


export function Login(){

  //State Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState("");


/**
 * The login() function is triggered when the user has entered his/her
 * login credentials. It makes the necessary request to the server to 
 * to authenticate the user. 
 * 
 * Note:
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
    axios.post(`http://${SERVER_IP}:3000/login`, {
      username: username,
      password: password,
    }).then(
      (response)  => {
        //if user does not exists the server sends a corresponding message
        if (response.data.message){
          setMessage(response.data.message);
        }else { //user exists in db
          //empty display message
          setMessage("")
          
          //after succesfull authenitcation store session id in session storage for session expiry check later
          sessionStorage.setItem("LoginToken", response.data); //store session_id as LoginToken in session storage
          sessionStorage.setItem("User", username); // store Username in Session Storage
          localStorage.setItem("isAuthenticated", true); //boolean value showing authentication statur in local storage
          
          //empty sessionStorage vars lastLocation and lastId so no redirection from last sessions happens after login
          sessionStorage.setItem("lastLocation", '');
          sessionStorage.setItem("lastId", '');

          //redirect to dashboard
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