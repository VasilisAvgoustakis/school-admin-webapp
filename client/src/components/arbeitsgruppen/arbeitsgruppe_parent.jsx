import React from 'react';
import { AgSelectList } from '..';
import axios from 'axios';
import '../../stylesheets/globalstyles.css'


/**
 * The parent functional component for AGs
 * @param {*} param0 navigate
 * @returns div containing the AgSelectList
 */


export function ArbeitsgruppenScreen({ navigation: { navigate }}) {
  axios.defaults.withCredentials = true;

  return (
      
      <div className='main-entity-data-cont'>
        <AgSelectList 
          navi={navigate} 
        />
      </div>
  );
}


export default ArbeitsgruppenScreen;