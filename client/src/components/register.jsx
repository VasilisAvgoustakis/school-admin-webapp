import { SERVER_IP } from '../globalFunctions';
import axios from 'axios';
import React, {useEffect, useState} from 'react';





export function Register() {

const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState ("");

const [verifCode, setVerifCode] = useState("");
const [message, setMessage] = useState("");




async function register() {
    await axios.post(`http://${SERVER_IP}:3000/register`, {
      username: usernameReg,
      password: passwordReg,
      verifCode: verifCode, 
    }).then((response) => {

      if (response.data.message){
        setMessage(response.data.message);
        document.getElementById('user').value = '';
        document.getElementById('pass').value = '';
        document.getElementById('verification').value = '';
        
      }
    });
 };

 //useEffect()


    return (
    <div className="registration">
        <h1>Registration</h1>
        <input
            id='user'
            type="text"
            placeholder="Benutzername..."
            onChange={(e) => {
            setUsernameReg(e.target.value);
            }}
        />
        <br></br>
        <input 
        id='pass'
        type="password"
        placeholder="Passwort..."
        onChange={(e) =>{
            setPasswordReg(e.target.value);
        }}
        /> 
        <br></br>
        <input 
        id='verification'
        type="text"
        placeholder="Verifizierungs Code..."
        onChange={(e) =>{
            setVerifCode(e.target.value);
        }}
        /> 
        <br></br>
        <button onClick={register} > 
          Register
        </button>
        <h1>{message}</h1>
    </div>
    );
  }