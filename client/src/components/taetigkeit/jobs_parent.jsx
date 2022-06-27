import React from 'react';
import { JobSelectList } from '..';
import axios from 'axios';
import '../../stylesheets/globalstyles.css'



export function JobsScreen({ navigation: { navigate }}) {
  axios.defaults.withCredentials = true;

  return (
      
      <div className='main-entity-data-cont'>
        <JobSelectList 
        navi={navigate} />
      </div>
  );
}



export default JobsScreen;