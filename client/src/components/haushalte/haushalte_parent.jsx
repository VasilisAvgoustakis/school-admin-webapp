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

      <div className='entity-data-cont'  id='haus-data'>
            <p className='info-text'>
              Klicke auf eine Addresse links um ihre Daten anzushen. </p>
      </div>
      </div>
  );
}



export default HaushalteScreen;