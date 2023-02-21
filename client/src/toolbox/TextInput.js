import React from 'react'
import { Grid, InputAdornment, TextField, Typography } from '@mui/material'

const TextInput = ({ name, type, label, value, handleChange, unit, readOnly}) => {
    return (
        <>
            <Grid item xs={3.5}>
                <Typography variant="h5" align="left">{label}</Typography>
            </Grid>
            <Grid item xs={8.5} justifyContent="flex-start" display="flex">
                <TextField
                    label={label}
                    name={name}
                    type={type}
                    required
                    value={value}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        readOnly: readOnly,
                        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
                    }}
                    style={{ maxWidth: "250px"}}
                />
            </Grid>
        </>
    )
}

export default TextInput