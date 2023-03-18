import React, { memo } from 'react'
import { Grid, InputAdornment, TextField } from '@mui/material'
import Header from './Header'

const CofDesInput = ({ name, type, label, value, handleValue, unit, description, handleDescription }) => {
    
    return (
        <>
            <Header size={3.5} variant="h5">{label}</Header>
            <Grid container item xs={8.5} direction="row" spacing={2}>
                <Grid item xs={5} justifyContent="flex-start" display="flex">
                    <TextField
                        label={label}
                        name={name}
                        type={type}
                        required
                        value={value}
                        onChange={handleValue}
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
                        }}
                        inputProps={{
                            step: 0.01
                        }}
                    />
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        label={"Description"}
                        name={name}
                        type="text"
                        value={description}
                        onChange={handleDescription}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default memo(CofDesInput)