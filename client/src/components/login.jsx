import React, {useState, useEffect, setRole} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





export function Login(props){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const [loginStatus, setLoginStatus] = useState("");
  const [message,setMessage] = useState("");

  //const [toDashboard, setToDashboard] = React.useState(false);

  const navigate = useNavigate();
  //const { loggedIn } = useAuth();


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
    axios.post(`http://172.25.12.99:3000/login`, {
      username: username,
      password: password,
    }).then((response)  => {

      if (response.data.message){
        setMessage(response.data.message);
        console.log(response.data);
      }else {
        setMessage("")
        console.log("Session Id: " + response.data);
      }
      
    })
  }


  return(
    <div className="login">
        <h1>Anmelden</h1>
        <input 
          type="text" 
          placeholder="Benutzername..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input 
          type="password" 
          placeholder="Passwort..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>
          Anmelden
        </button>
        <h1>{message}</h1>
      </div>   
  )
}