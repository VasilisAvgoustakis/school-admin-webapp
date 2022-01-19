import React from 'react';
import { CustomSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css'



export function CustomScreen() {
  axios.defaults.withCredentials = true;

  return (
      
      <div className='main-entity-data-cont'>
        <CustomSelectList  />
      </div>
  );
}



export default CustomScreen;