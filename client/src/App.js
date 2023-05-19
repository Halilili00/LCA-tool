import React, { useEffect, useState } from "react";

import "./App.css"
import { Box } from "@mui/material";

import LCAData from "./components/LCAData";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignInForm";
import AdminSignForm from "./components/AdminSignForm";
import OnlyAdminCanRoute from "./toolbox/OnlyAdminCanRoute";
import PrivateRoutes from "./toolbox/PrivateRoutes";
import { Alertprovider } from "./hooks/useDialogAlert";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getUserData } from "./redux/actions/postActions";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { configuration } from "./configuration";
import FormsRouting from "./components/Forms/FormsRouting";
import PrintPageRouting from "./components/PrintPages.js/PrintPageRouting";
import ApiPage from "./components/ApiPage";


const pca = new PublicClientApplication(configuration)

const App = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeMode, setAciveMode] = useState("User");

  useEffect(() => {
    if (user?.token) {
      const decodedToken = jwtDecode(user.token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(decodedToken.isAdmin)
        if (activeMode === "Admin") {
          dispatch(getAllData())
        } else {
          dispatch(getUserData())
        }
      } else {
        dispatch(getUserData())
      }
    }
    console.log(user)
  }, [user?.result, activeMode])


  console.log("app")
  console.log(isAdmin)

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <MsalProvider instance={pca}>
        <div className="App">
          <div className="App-header">
            <Box sx={{ width: { xl: "1400px" } }} m="auto">
              <Alertprovider>
                <Navbar activeMode={activeMode} setAciveMode={setAciveMode} />
                <Routes>
                  <Route index element={<SignIn />} />
                  <Route element={<PrivateRoutes />}>
                    <Route path="Forms/:tempID" element={<FormsRouting />} exact />
                    <Route path="Forms/:tempID/:id" element={<FormsRouting />} />
                    <Route path="LCADatas" element={<LCAData />} />
                    <Route path="LCADatas/:tempID/:id" element={<PrintPageRouting/>} />
                    <Route path="GetApi" element={<ApiPage/>} />
                  </Route>
                  <Route path="Admin" element={<AdminSignForm />} />
                  <Route element={<OnlyAdminCanRoute />}>
                    <Route path="Admin">
                      <Route path="LCADatas" element={<p>Coming soon...</p>} />
                    </Route>
                  </Route>
                  <Route path="*" element={<p>There's nothing here: 404!</p>} />
                </Routes>
              </Alertprovider>
            </Box>
          </div>
        </div>
      </MsalProvider>
    </GoogleOAuthProvider >
  );
};

export default App;
