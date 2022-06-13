import React, {useState} from 'react';
import axios from 'axios';


export function Logout(props){

    const [message,setMessage] = useState("");

    function logout() {
        axios.post(`http://172.25.12.99:3000/logout`, {
    //   username: username,
    //   password: password,
    }).then((response)  => {
        setMessage(response.data.message);
        console.log(response.data.message);
    })
  }

  return(
      <div className='logout'>
          <button onClick={logout}>Logout</button>
          <h1>{message}</h1>
      </div>
  )
}
