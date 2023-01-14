import React from "react";

import { Grid, InputAdornment, TextField, Typography } from "@mui/material";

const Input = ({ name, type, label, value, handleChange, unit, handleFile, readOnly, coefficinetValue, handleCoeffinetChange, sum}) => {
  return (
    <>
      <Grid item xs={3.5}>
        <Typography variant="h5" style={{margin: "10px 0 0 20px", display: "flex"}}>{label}</Typography>
      </Grid>
      <Grid item xs={2}>
        {readOnly ? <TextField
          label={label}
          name={name}
          type={type}
          required
          value={value}
          onChange={handleChange}
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
          }}
        />
      :
      <TextField
          label={label}
          name={name}
          type={type}
          required
          value={value}
          onChange={handleChange}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
          }}
          inputProps={{
            step: 0.01
          }}
        />}
        
      </Grid>
      {handleCoeffinetChange ? <>
      <Grid item xs={0.3} style={{marginTop: "20px"}}>
        <Typography variant="body2">X</Typography>
      </Grid>
      <Grid item xs={0.9}>
        <TextField
          label={"Cofficinet"}
          name={name}
          type={type}
          required
          value={coefficinetValue}
          onChange={handleCoeffinetChange}
          fullWidth
          inputProps={{
            step: 0.01
          }}
        />
      </Grid></>
      : 
      <Grid item xs={1.2}>
        <Typography/>
      </Grid>}
      {sum ? <Grid item xs={1.6} style={{marginTop: "20px"}}>
        <Typography variant="body1">= {sum.toFixed(2)} CO2 eqv GHG kg</Typography>
      </Grid> : <Grid item xs={1.6}>
        <Typography/>
      </Grid>}
      {handleFile ? <Grid item xs={3.5}>
        <TextField type="file" name={name} onChange={handleFile} fullWidth/>
      </Grid>: <Grid item xs={3.5}>
        <Typography/>
      </Grid>}
    </>
  );
};

export default Input;