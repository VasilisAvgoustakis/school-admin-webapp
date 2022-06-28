import { SERVER_IP } from '../globalFunctions';
import axios from 'axios';
import React, {useState} from 'react';


/**
 * The 'Register' component is a functional React component that provides all functionality
 * for registering new users. 
 * 
 * @returns HTML Code providing the Registration Form.
 */


export function Register() {

//State variables and useState Hooks
const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState ("");
const [verifCode, setVerifCode] = useState("");
const [message, setMessage] = useState("");

/**Function 'register()' is called when the register button is pressed.
 * It makes a POST request to the server that, if provided with a valid 
 * verification code(verifcode), stores the new user and his credentials in the db.
*/

async function register() {
    await axios.post(`http://${SERVER_IP}:3000/register`, {
      username: usernameReg,
      password: passwordReg,
      verifCode: verifCode, 
    }).then(
      (response) => {
        if (response.data.message){
          //get response message from server to display on screen
          setMessage(response.data.message);

          //empty the inputs in the register form 
          document.getElementById('user').value = '';
          document.getElementById('pass').value = '';
          document.getElementById('verification').value = '';
        }
      }
      );
 };

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

          <button onClick={register} >Register</button>
          
          <h1>{message}</h1>
      </div>
    );
  }