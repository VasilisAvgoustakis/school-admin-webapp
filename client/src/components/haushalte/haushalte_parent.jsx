import React from 'react';
import { HausSelectList } from '..';
import axios from 'axios';
import '../../stylesheets/personen.css';
import '../../stylesheets/globalstyles.css'




export function HaushalteScreen({ navigation: { navigate }}) {
  axios.defaults.withCredentials = true;

  return (
      
      <div className='main-entity-data-cont'>
        <HausSelectList 
        navi={navigate} />
      </div>
  );
}



export default HaushalteScreen;