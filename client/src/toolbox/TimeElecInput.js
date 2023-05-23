import React, { memo } from 'react'
import { Grid, InputAdornment, TextField, Typography } from '@mui/material'
import Header from './Header'

const TimeElecInput = ({ header, name, type, label1, label2, time, value, electricity, description, handleChange, handleTime, handleElectricity, unit1, unit2, handleFile, readOnly, coefficinetValue, handleCoeffinetChange, sum, fileValue, handleDeleteFile, handleDescription }) => {


    return (
        <>
            <Header size={3.5} variant="h5">{header ? header : label1}</Header>
            <Grid container item xs={12} sm={8.5} direction="row">
                <Grid item className="styled-grid3">
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
                <Grid item sx={{ margin: "20px 8px 0 8px", '@media (max-width: 900px)': { margin: "8px 0px 8px 0px", minWidth: "100%" } }}>
                    <Typography variant="body2">X</Typography>
                </Grid>
                <Grid item className="styled-grid3">
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
                <Grid item className="styled-grid3" style={{ marginTop: "20px" }}>
                    {sum > 0 ? <Typography variant="body1">= {sum.toFixed(2)} CO2 eqv GHG kg</Typography> : <Typography variant="body1"></Typography>}
                </Grid>
            </Grid>
        </>
    )
}

export default memo(TimeElecInput)