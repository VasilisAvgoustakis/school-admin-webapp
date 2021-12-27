import React, {useState} from 'react';
import axios from 'axios';


export function Login(props){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [loginStatus, setLoginStatus] = useState("");
  
  
    async function login() {
      await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`, {
        username: username,
        password: password,
      }).then((response)  => {
  
        if (response.data.message){
          setLoginStatus(response.data.message);
        }else {
          setLoginStatus(response.data[0].username)}
        console.log(response.data);
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
          <h1>{loginStatus}</h1>
        </div>   
    )
  }