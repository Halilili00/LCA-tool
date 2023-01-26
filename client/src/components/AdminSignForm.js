import React, { useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { signInAdmin } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const AdminSignForm = () => {
    const [signData, setSignData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signInAdmin(signData, navigate))
        console.log(signData);
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setSignData({ ...signData, [name]: value });
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper
                style={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                }}
                elevation={3}
            >
                <Typography variant='h4'>Welcome to LCA tool</Typography>
                <Typography variant='h5'>You are signing in as a admin</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField type="text" name="name" value={signData.name} label="Frist Name and Last Name" variant="outlined" required fullWidth autoFocus onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="email" name='email'  value={signData.email} label="Email Address" variant="outlined" required fullWidth onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" name='password'  value={signData.password} label="Password" variant="outlined" required autoComplete="false" fullWidth onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>Sign In</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    )
}

export default AdminSignForm