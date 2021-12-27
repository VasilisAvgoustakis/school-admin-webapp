import axios from 'axios';
import React, {useState} from 'react';





export function Register() {


const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState ("");

async function register() {
    await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/register`, {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
 };


    return (
    <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
            type="text"
            onChange={(e) => {
            setUsernameReg(e.target.value);
            }}
        /><br/>
        <label>password</label>
        <input 
        type="text"
        onChange={(e) =>{
            setPasswordReg(e.target.value);
        }}
        /> <br />
        <button onClick={register} > Register</button>
    </div>
    );
  }