import React, { memo } from 'react'
import { Grid, InputAdornment, TextField, Typography } from '@mui/material'
import Header from './Header'

const TextInput = ({ name, type, label, value, handleChange, unit, readOnly }) => {
    console.log("Text Input rendered")
    return (
        <>
            <Header size={3.5} variant="h5">{label}</Header>
            <Grid item xs={8.5} justifyContent="flex-start" display="flex">
                <TextField
                    label={label}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        readOnly: readOnly,
                        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
                    }}
                    style={{ maxWidth: "250px" }}
                />
            </Grid>
        </>
    )
}

export default memo(TextInput);