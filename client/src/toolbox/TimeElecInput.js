import React, { memo } from 'react'
import { Button, ButtonGroup, Grid, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import Header from './Header'

const TimeElecInput = ({ header, name, type, label1, label2, time, value, electricity, description, handleChange, handleTime, handleElectricity, unit1, unit2, handleFile, readOnly, coefficinetValue, handleCoeffinetChange, sum, fileValue, handleDeleteFile, handleDescription }) => {


    return (
        <>
            <Header size={3.5} variant="h5">{header ? header : label1}</Header>
            <Grid container item xs={8.5} direction="row">
                <Grid item xs={4}>
                    <TextField
                        label={label1}
                        name={name}
                        type={type}
                        required
                        value={value}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            readOnly: readOnly,
                            endAdornment: <InputAdornment position="end" >{unit1}</InputAdornment>
                        }}
                        inputProps={{
                            step: 0.01
                        }}
                    />
                </Grid>
                <Grid item xs={0.5} style={{ marginTop: "20px" }}>
                    <Typography variant="body2">X</Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label={label2}
                        name={name}
                        type={type}
                        required
                        value={coefficinetValue}
                        onChange={handleCoeffinetChange}
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end" sx={{ "& .MuiTypography-root": { fontSize: "0.7rem" }}}>{unit2}</InputAdornment>
                        }}
                        inputProps={{
                            step: 0.01
                        }}
                    />
                </Grid>
                <Grid item xs={3.5} style={{ marginTop: "20px" }}>
                    {sum > 0 ? <Typography variant="body1">= {sum.toFixed(2)} CO2 eqv GHG kg</Typography> : <Typography variant="body1"></Typography>}
                </Grid>
            </Grid>
        </>
    )
}

export default memo(TimeElecInput)