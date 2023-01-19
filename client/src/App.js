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
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./redux/actions/postActions";
import LCAPrintPage from "./components/LCAPrintPage";


const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.token) {
        dispatch(getData(user?.result._id))
    }
    console.log(user)
}, [user?.result])

  console.log("app")
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
                <Route path="/LCADatas/:id" element={<LCAPrintPage/>} />
              </Route>
              <Route path="/SignIn" element={<SignIn setUser={setUser}/>} />
            </Routes>
          </Box>
        </div>
      </div>
    </GoogleOAuthProvider >
  );
};

export default App;
