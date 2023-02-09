import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Form from "./components/Form";
import LCAData from "./components/LCAData";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignInForm";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PrivateRoutes } from "./toolbox/PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getData } from "./redux/actions/postActions";
import LCAPrintPage from "./components/LCAPrintPage";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { configuration } from "./configuration";
import AdminSignForm from "./components/AdminSignForm";
import OnlyAdminCanRoute from "./toolbox/OnlyAdminCanRoute";
import jwtDecode from "jwt-decode";
import { Alertprovider } from "./hooks/useDialogAlert";


const pca = new PublicClientApplication(configuration)

const App = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeMode, setAciveMode] = useState("Admin");

  useEffect(() => {
    if (user?.token) {
      const decodedToken = jwtDecode(user.token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(decodedToken.isAdmin)
        if (activeMode === "Admin") {
          dispatch(getAllData())
        } else {
          dispatch(getData(decodedToken.sub))
        }
      } else {
        dispatch(getData(decodedToken.sub))
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
                    <Route path="Forms" element={<Form />} exact />
                    <Route path="Forms/:id" element={<Form />} />
                    <Route path="LCADatas" element={<LCAData />} />
                    <Route path="LCADatas/:id" element={<LCAPrintPage />} />
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
