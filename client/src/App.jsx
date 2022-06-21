import React,{useEffect, useState} from "react";
import axios from 'axios';
import "./components/stylesheets/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute";
import Landing from './app/landing';
import { Navigation} from './components';


function App() {

  // var [isAuthenticated, setAuth] = useState(false);

  // async function LoginSessionQuery(session_id){
  //   return (
  //     await axios.post(`http://172.25.12.99:3000/sessionId`, {
  //         params: {
  //             session_id: session_id,
  //         },
  //         }).then((res) => {
  //           if(res){
  //             console.log(res.data)
  //             let serverReturnId = res.data
      
  //             if(serverReturnId === sessionStorage.getItem("LoginToken")){
  //               setAuth(true);
  //               //setLoading(false);
  //               console.log("Session Id exists", "Authenticated: ", isAuthenticated, typeof(isAuthenticated))
  //             }
              
  //           }else{
  //             console.log("Session has expired!")
  //           }
  //         }).then((res) =>{ console.log(isAuthenticated)})
  //         )
  // }


  // useEffect(() => {
  //   LoginSessionQuery(sessionStorage.getItem("LoginToken"))
  // }, [])




  return (
    //LoginSessionQuery(sessionStorage.getItem("LoginToken")),
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {<Landing />} />
            <Route path='/dashboard'  element={
              <ProtectedRoute >
                {/* <ProtectedRoute props={isAuthenticated}> */}
                <Navigation />
              </ProtectedRoute>
            }/>
                {/* <Route index element= {<Landing />} /> */}
                {/* <Route path='/dashboard' element={<Navigation/>}/> */}
            
        </Routes>
    </BrowserRouter>
  );
}

export default App;