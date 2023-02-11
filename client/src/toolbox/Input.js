import React from "react";
import { Button, ButtonGroup, Grid, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

const Input = ({ name, type, label, value, handleChange, unit, handleFile, readOnly, coefficinetValue, handleCoeffinetChange, sum, fileValue, handleDeleteFile }) => {
  const downloadPDF = (data, filename) => {
    const linkSource = data;
    const downloadLink = document.createElement("a");
    let fileName = filename;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <>
      <Grid item xs={3.5}>
        <Typography variant="h5" style={{ margin: "10px 0 0 20px", display: "flex" }}>{label}</Typography>
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
      {handleCoeffinetChange ? <Grid container item xs={1.5} direction="row">
        <Grid item xs={3} style={{ marginTop: "20px" }}>
          <Typography variant="body2">X</Typography>
        </Grid>
        <Grid item xs={9}>
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
        </Grid></Grid>
        :
        <Grid item xs={1.5}>
          <Typography />
        </Grid>}
      {sum ? <Grid item xs={2} style={{ marginTop: "20px" }}>
        <Typography variant="body1">= {sum.toFixed(2)} CO2 eqv GHG kg</Typography>
      </Grid> : <Grid item xs={2}>
        <Typography />
      </Grid>}
      {handleFile ? <Grid item xs={3}>
        {fileValue ?
          <ButtonGroup>
            <Tooltip title="Download file">
              <Button variant="outlined" onClick={() => downloadPDF(fileValue.data, fileValue.name)} endIcon={<DownloadIcon/>}>{fileValue.name.length > 27 ? `${fileValue.name.split("").splice(0,24).join("")}...` : fileValue.name}</Button>
            </Tooltip>
            <Tooltip title="Delte file" >
              <Button variant='outlined' name={name} onClick={handleDeleteFile}>X</Button>
            </Tooltip>
          </ButtonGroup>
          :
          <TextField type="file" name={name} onChange={handleFile} />}
      </Grid> : <Grid item xs={3}>
        <Typography />
      </Grid>}
    </>
  );
};

export default Input;