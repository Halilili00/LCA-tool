import React, { memo } from 'react'
import { Button, ButtonGroup, Grid, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import Header from './Header'

const CofDesFileInput = ({ header, label, name, unit, type, value, coefficinetValue, description, fileValue, handleChange, handleCoeffinetChange, handleDescription, handleFile, handleDeleteFile, sum }) => {
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
            <Header size={3.5} variant="h5">{header ? header : label}</Header>
            <Grid container item xs={8.5} direction="column" spacing={1}>
                <Grid container item xs={4}>
                    <Grid item xs={4}>
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
                        />
                    </Grid>
                    <Grid item xs={0.5} style={{ marginTop: "20px" }}>
                        <Typography variant="body2">X</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label={"Cofficinet"}
                            name={name}
                            type={type}
                            required
                            value={coefficinetValue}
                            onChange={handleCoeffinetChange}
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg CO2 eq/t-km</InputAdornment>
                            }}
                            inputProps={{
                                step: 0.01
                            }}
                        />
                    </Grid>
                    <Grid item xs={3.5} style={{ marginTop: "20px" }}>
                        {sum > 0 ? <Typography variant="body1">= {sum.toFixed(2)} kg CO2 eq</Typography> : <Typography variant="body1"></Typography>}
                    </Grid>
                </Grid>
                <Grid container item xs={4} direction="col" spacing={1}>
                    <Grid item xs={8}>
                        <TextField
                            label={"Description"}
                            name={name}
                            type="text"
                            value={description}
                            onChange={handleDescription}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
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
                            handleFile && <TextField type="file" name={name} onChange={handleFile} />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default memo(CofDesFileInput)