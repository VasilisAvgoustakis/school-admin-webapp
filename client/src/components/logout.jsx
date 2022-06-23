import React, {useState} from 'react';
import axios from 'axios';

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
        axios.post(`http://172.25.12.99:3000/logout`, {
            session_id: sessionStorage.getItem("LoginToken")
        })
        .then((response)  => {
            setMessage(response.data.message);
            //redirect to Landing page
            window.location.href = "/"; 
        })
  }

  return(
      <div className='logout'>
          <button onClick={logout}>Logout</button>
          <h1>{message}</h1>
      </div>
  )
}
