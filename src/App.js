import { useEffect, useState } from "react";
import axios from 'axios';
import HomePage from "./page/HomePage";
import LoginPage from "./page/LonginPage";
import AccountPage from "./page/AccountPage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {

  const { currentUser } = useAuth();

  // const {currentUser} = useContext(useAuth)

  useEffect(() => {
    // console.log(currentUser)
  }, [])
  

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/register"} />;
  };

    return (
    <Routes>
      <Route path="/register" element={<AccountPage/> } />
      <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
            
              // <LandingPage />
            
          }
        />
   <Route path="/AccountPage" element={<AccountPage/>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
