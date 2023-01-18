import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInGoogle } from '../redux/actions/authActions';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box style={{ padding: "50px", marginTop: "20px" }}>
      <Typography variant='h3'>Welcome to LCA tool</Typography>
      <Typography variant='h5'>Please login to continue</Typography>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"2%"}}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            dispatch(signInGoogle(credentialResponse, navigate))
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </Box>
  );
}