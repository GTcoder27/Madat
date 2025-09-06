import {React, useEffect } from 'react';
import Navbar from "./components/Navbar.jsx";
import { Routes,Route, Navigate } from 'react-router-dom';
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RecordEMessage from './pages/RecordEMessage.jsx';
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";

import { useDispatch,useSelector } from 'react-redux';
import { checkAuth } from './redux/slice/AuthSlice.js';



const App = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [checkAuth]);

  console.log("authuser" , authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );



  return (
    <div  className=' flex flex-col w-[100vw] h-auto text-center justify-center items-center' >
      <Navbar />

      <Routes>
        <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/home" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/madat_kara" element={authUser ? <Navigate to="/login" /> :<RecordEMessage/> }/>  
      </Routes>

      <Toaster />
    </div>
  )
}

export default App;
