import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInGoogle, signInMicrosoft } from '../redux/actions/authActions';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMsal } from '@azure/msal-react';
import ms_login_button from '../images/ms_login_button.png'
import { loginRequest } from '../configuration';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { instance } = useMsal();

  //console.log(location)

  const handleLogin = async () => {
    instance.loginPopup(loginRequest)
      .then(response => { return dispatch(signInMicrosoft(response, navigate)) })
      .catch(e => { console.log(e) })
  }

  return (
    <Box sx={{ padding: {xs:"20px 0 0 0", md:"50px"}, background: "#222B36" }}>
      <Typography variant='h4'>
        Welcome to Product GHG emission<sup>+</sup>
      </Typography>
      <Grid container mt={5} sx={{flexDirection: {xs: "column", md: "row"}}} justifyContent="center" alignItems="center">
        <Grid item xs={7} sx={{ borderRightStyle: {md: "solid"}, borderBottomStyle: {xs: "solid", md: "none"}}}>
          <Typography variant='body1'textAlign="left">
            Product GHG emission<sup>+</sup> tool enables users to develop inventories of GHG emissions related to their products. The results are obtained using emission factors (EF), GHG emissions per each activity/input, multiplied by the activity or data input. The EFs, which cover multiple GHGs and are expressed in CO2 equivalents (CO2e), are gathered from life cycle databases, government agencies, and academic literature.
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{marginTop: {xs: "20px", md: "0"}}}>
          <Typography variant='h6'>Please sign in to continue</Typography>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2%", marginBottom: "1%" }}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                dispatch(signInGoogle(credentialResponse, navigate))
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
          <Divider>
            <Chip label="or" style={{ color: "white" }} />
          </Divider>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1%" }}>
            <img src={ms_login_button} alt='Sign in with Microsoft' onClick={() => handleLogin()} />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}