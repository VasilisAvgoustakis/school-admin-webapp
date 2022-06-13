import axios from 'axios';
import React, {useState} from 'react';





export function Register() {

const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState ("");

const [verifCode, setVerifCode] = useState("");
const [message, setMessage] = useState("");




async function register() {
    await axios.post(`http://172.25.12.99:3000/register`, {
      username: usernameReg,
      password: passwordReg,
      verifCode: verifCode, 
    }).then((response) => {

      if (response.data.message){
        setMessage(response.data.message);
      }//else {
       // setVerifCode(response.data[0].code)
      //}
      
      console.log(response.data);
    });
 };


    return (
    <div className="registration">
        <h1>Registration</h1>
        <input
            type="text"
            placeholder="Benutzername..."
            onChange={(e) => {
            setUsernameReg(e.target.value);
            }}
        />
        <input 
        type="password"
        placeholder="Passwort..."
        onChange={(e) =>{
            setPasswordReg(e.target.value);
        }}
        /> 
        <input 
        type="text"
        placeholder="Verifizierungs Code..."
        onChange={(e) =>{
            setVerifCode(e.target.value);
        }}
        /> 
        <button onClick={register} > 
          Register
        </button>
        <h1>{message}</h1>
    </div>
    );
  }