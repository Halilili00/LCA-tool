import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInGoogle, signInMicrosoft } from '../redux/actions/authActions';
import { Chip, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMsal } from '@azure/msal-react';
import ms_login_button from '../images/ms_login_button.png'

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { instance } = useMsal();

  //console.log(location)

  const handleLogin = async () => {
    instance.loginPopup({ scopes: ["email", "User.Read"] })
      .then(response => { return dispatch(signInMicrosoft(response, navigate)) })
      .catch(e => { console.log(e) })
  }

  return (
    <Box sx={{ padding: "50px", background:"#222B36"}}>
      <Typography variant='h3'>Welcome to LCA tool</Typography>
      <Typography variant='h5'>Please sign in to continue</Typography>
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
        <Chip label="or" style={{color: "white"}}/>
      </Divider>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1%" }}>
        <img src={ms_login_button} alt='Sign in with Microsoft' onClick={()=>handleLogin()}/>
      </div>
    </Box>
  );
}