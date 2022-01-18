import React from 'react';
import { AgSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css'



export function ArbeitsgruppenScreen() {
  axios.defaults.withCredentials = true;

  return (
      
      <div className='main-entity-data-cont'>
        <AgSelectList  />
      </div>
  );
}



export default ArbeitsgruppenScreen;