import React from 'react';
import { HausSelectList } from '..';
import axios from 'axios';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css'









export function HaushalteScreen() {
  axios.defaults.withCredentials = true;
  
    // Check already logged users using Axios.
  // a useEffect to run whenever we refresh the page.
  // In here “SET ROLE” changes the active roles within the current session.
  // useEffect(() => {
  //   axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`).then((response) => {
  //     if (response.data.user) {
  //       //setRole(response.data.user[0].role);
  //       console.log(response.data)
  //     }
  //   });
  // }, []);



  return (
      
      <div className='main-entity-data-cont'>
        <HausSelectList  />
      </div>
      //   {/* <div className='person-data-cont'  id='person-data'>Person Data Container in personen_parent</div>
      // </div> */}
      
      
  );
}



export default HaushalteScreen;