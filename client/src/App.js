import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css"
import Form from "./components/Form";
import LCAData from "./components/LCAData";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignInForm";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PrivateRoutes } from "./toolbox/PrivateRoutes";
import { useDispatch } from "react-redux";
import { getData } from "./redux/actions/postActions";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    if(user?.token){
      dispatch(getData(user?.result._id))
    }
  }, [user?.result])

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="App">
        <div className="App-header">
          <Box sx={{ width: { xl: "1400px" } }} m="auto">
            <Navbar />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Form />} exact/>
                <Route path="/LCADatas" element={<LCAData/>} />
                <Route path="/:id" element={<Form />} />
              </Route>
              <Route path="/SignIn" element={<SignIn />} />
            </Routes>
          </Box>
        </div>
      </div>
    </GoogleOAuthProvider >
  );
};

export default App;
