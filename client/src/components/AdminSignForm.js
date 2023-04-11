import React from 'react'
import { Box, Chip, Divider, FormHelperText, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { signInAdmin } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import { useMsal } from '@azure/msal-react';
import ms_login_button from '../images/ms_login_button.png'
import { loginRequest } from '../configuration';

const AdminSignForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { instance } = useMsal();
    const error = useSelector((state) => state.authReducer.error)

    const handleLogin = async () => {
        instance.loginPopup(loginRequest)
            .then(response => { return dispatch(signInAdmin("Microsoft", response, navigate)) })
            .catch(e => { console.log(e) })
    }

    return (
        <Box sx={{ padding: "50px", background: "#222B36" }}>
            <Typography variant='h4'>Welcome to Calculations for Greenhouse Gas Emissions</Typography>
            <Typography variant='h5'>You are signing in as a admin</Typography>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2%", marginBottom: "1%" }}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        dispatch(signInAdmin("Google", credentialResponse, navigate))
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
            {error && <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
            </Grid>
            }
        </Box>

    )
}

export default AdminSignForm