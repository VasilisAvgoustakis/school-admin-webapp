import React from 'react';
import { LgSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css'



export function LerngruppenScreen() {
  axios.defaults.withCredentials = true;

  return (
      
      <div className='main-entity-data-cont'>
        <LgSelectList  />
      </div>
  );
}



export default LerngruppenScreen;