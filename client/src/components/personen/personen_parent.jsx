import React from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css'









export function PersonenScreen() {
  axios.defaults.withCredentials = true;
  

  return (
      
      <div className='main-entity-data-cont'>
        <PersonSelectList  />
      </div>

      
      
  );
}



export default PersonenScreen;