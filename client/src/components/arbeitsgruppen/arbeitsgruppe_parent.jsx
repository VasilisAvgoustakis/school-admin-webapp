import React from 'react';
import { AgSelectList } from '..';
import axios from 'axios';
import '../../stylesheets/globalstyles.css'



export function ArbeitsgruppenScreen({ navigation: { navigate }}) {
  axios.defaults.withCredentials = true;

  return (
      
      <div className='main-entity-data-cont'>
        <AgSelectList 
        navi={navigate} />
      </div>
  );
}



export default ArbeitsgruppenScreen;