import React from "react";
import "./stylesheets/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute";
import Landing from './app/landing';
import { Navigation} from './components';

/**
 * "App" is a simple functional React component that returns the webapps main routes.
 * @returns BrowserRouter Component containg all main and protected Routes.
 */

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