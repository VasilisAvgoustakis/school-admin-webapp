import React,{useEffect} from "react";
import { Sleep } from "../globalFunctions";



function Redirect({isAuthenticated}) {

    useEffect(() => {
        
        Sleep(5000).then((resolve)=>{
            if(!document.getElementById('person-screen')){
              window.location.href = "/";
            }
        })
        
      }, [])

    return (
      
      <div>
        <p>Nicht eingeloggt oder Session expired! Redirecting...</p>
                                    
     </div>
    );
  }

  export default Redirect;