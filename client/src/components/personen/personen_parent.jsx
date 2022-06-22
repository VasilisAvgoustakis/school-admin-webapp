import React,{useRef, useEffect} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css'




export function PersonenScreen({ navigation: { navigate }}) {
  axios.defaults.withCredentials = true;

  

  return (
      
      <div id='person-screen' className='main-entity-data-cont'>
        <PersonSelectList 
         navi={navigate} />
      </div>

      
      
  );
}



export default PersonenScreen;