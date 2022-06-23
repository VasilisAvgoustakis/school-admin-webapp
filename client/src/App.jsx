import React,{useEffect, useState} from "react";
import axios from 'axios';
import "./components/stylesheets/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute";
import Landing from './app/landing';
import { Navigation} from './components';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {<Landing />} />
            <Route path='/dashboard'  element={
              <ProtectedRoute >
                <Navigation />
              </ProtectedRoute>
            }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;