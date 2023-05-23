import React, { memo } from "react";
import { Button, ButtonGroup, Grid, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import Header from "./Header";

const Input = ({ header, name, type, label, value, description, handleChange, unit, handleFile, readOnly, coefficinetValue, handleCoeffinetChange, sum, fileValue, handleDeleteFile, handleDescription }) => {
  const downloadPDF = (data, filename) => {
    const linkSource = data;
    const downloadLink = document.createElement("a");
    let fileName = filename;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  //console.log("Input rendered " + name)
  return (
    <>
      <Header size={3.5} variant="h5">{header ? header : label}</Header>
      <Grid container item xs={12} sm={8.5} direction="row">
        {handleCoeffinetChange ?
          <Grid container item direction="row">
            <Grid item className="styled-grid3">
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
                inputProps={{
                  step: 0.01
                }}
              />
            </Grid>
            <Grid item sx={{ margin: "20px 8px 0 8px", '@media (max-width: 900px)': { margin: "8px 0px 8px 0px", minWidth: "100%" } }}>
              <Typography variant="body2">X</Typography>
            </Grid>
            {handleDescription ?
              <Grid container item direction="column" spacing={0.5}>
                <Grid item className="styled-grid3">
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
                </Grid>
                <Grid item className="styled-grid3">
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
              : <Grid item className="styled-grid3">
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
              </Grid>}
            <Grid item className="styled-grid3" style={{ marginTop: "20px" }}>
              {sum > 0 ? <Typography variant="body1">= {sum.toFixed(2)} CO2 eqv GHG kg</Typography> : <Typography variant="body1"></Typography>}
            </Grid>
          </Grid> :
          <Grid item className="styled-grid2">
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
              inputProps={{
                step: 0.01
              }}
            />
          </Grid>
        }
        <Grid item xs={12}>
          {fileValue ?
            <ButtonGroup>
              <Tooltip title="Download file">
                <Button variant="outlined" onClick={() => downloadPDF(fileValue.data, fileValue.name)} endIcon={<DownloadIcon />}>{fileValue.name.length > 27 ? `${fileValue.name.split("").splice(0, 24).join("")}...` : fileValue.name}</Button>
              </Tooltip>
              <Tooltip title="Delte file" >
                <Button variant='outlined' name={name} onClick={handleDeleteFile}>X</Button>
              </Tooltip>
            </ButtonGroup>
            :
            handleFile && <TextField type="file" fullWidth name={name} onChange={handleFile} />
          }
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Input);