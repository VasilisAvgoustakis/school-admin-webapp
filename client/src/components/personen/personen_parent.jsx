import React from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css'




export function PersonenScreen({ navigation: { navigate }}) {
  axios.defaults.withCredentials = true;
  //var lastLoc = sessionStorage.getItem("lastLocation");
  //var lastId = sessionStorage.getItem("lastId");
  
  

  return (
      
      <div className='main-entity-data-cont'>
        <PersonSelectList 
         navi={navigate} />
      </div>

      
      
  );
}



export default PersonenScreen;