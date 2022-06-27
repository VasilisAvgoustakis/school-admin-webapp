import { SERVER_IP } from '../globalFunctions';
import React, {useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/globalstyles.css';

/**
 * 'Logout' is a functinal React Component containing the logout funtionality.
 * On succesfull logout the user's session is deleted from the database.
 *  
 * @returns HTML Code containing the logout button.
 */


export function Logout(){
    //State Variables and set Methods
    const [message,setMessage] = useState("");

    //Logout function triggered by the logout button
    function logout() {
        //POST request to server to delete the LoginToken (session id) form the DB.
        axios.post(`http://${SERVER_IP}:3000/logout`, {
            session_id: sessionStorage.getItem("LoginToken")
        })
        .then((response)  => {
            setMessage(response.data.message);
            sessionStorage.setItem("lastLocation", '');
            sessionStorage.setItem("lastId", '');
            //redirect to Landing page
            window.location.href = "/"; 
        })
  }

  return(
    
      <div className='logout'>
        <button className='logout-btn' onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} />Logout</button>
        <br></br>
        <div className='current-user'>
            Eingeloggt als: {sessionStorage.getItem('User')}
            {/* <h3>{message}</h3> */}
        </div>
        
      </div>
  )
}
