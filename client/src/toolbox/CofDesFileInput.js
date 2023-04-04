import React, { memo, useEffect, useMemo, useState } from 'react'
import { Button, ButtonGroup, Grid, InputAdornment, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import Header from './Header'

const CofDesFileInput = ({ header, label, lableVariant, name, unit1, unit2, type, value, handleValue, coefficinetValue, options, handleSelection, description, fileValue, handleChange, handleCoeffinetChange, handleDescription, handleFile, handleDeleteFile, sum }) => {
    const downloadPDF = (data, filename) => {
        const linkSource = data;
        const downloadLink = document.createElement("a");
        let fileName = filename;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const [id, setId] = useState(0);

    useEffect(() => {
        //jos tulee joskus myöhemmin samaanlaisia valuetia optionissa ei sitte ei toimi oikein!!!!
        if(value!==0){
            options.map(opt => opt.value === coefficinetValue && setId(opt.id))
        }
    }, [coefficinetValue])
    return (
        <>
            <Header size={3.5} variant={lableVariant ? lableVariant : "h5"}>{header ? header : label}</Header>
            <Grid container item xs={8.5} direction="column" spacing={1}>
                <Grid container item spacing={1}>
                    <Grid item xs={6}>
                        <Select
                            value={id}
                            onChange={(e) => handleSelection(e, options)}
                            name={name}
                            fullWidth
                        >
                            {options.map((opt, index) => (
                                <MenuItem onClick={() => setId(opt.id)} value={opt.id} key={index}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
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
                {handleCoeffinetChange ?
                    <Grid container item >
                        <Grid item xs={2.5}>
                            <TextField
                                label={label}
                                name={name}
                                type={type}
                                required
                                value={value}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
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
                        <Grid item xs={3}>
                            <TextField
                                label={"EF"}
                                name={name}
                                type={type}
                                required
                                value={coefficinetValue}
                                onChange={handleCoeffinetChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" sx={{ "& .MuiTypography-root": { fontSize: "0.7rem" } }}>{unit2}</InputAdornment>
                                }}
                                inputProps={{
                                    step: 0.01
                                }}
                            />
                        </Grid>
                        <Grid item xs={3} style={{ marginTop: "20px" }}>
                            {sum > 0 ? <Typography variant="body1">= {sum.toFixed(2)} kg CO2 eq</Typography> : <Typography variant="body1"></Typography>}
                        </Grid>
                        <Grid item xs={3}>
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
                    :
                    <Grid container item spacing={1}>
                        <Grid item xs={9} justifyContent="flex-start" display="flex">
                            <TextField
                                label={"EF"}
                                name={name}
                                type={type}
                                required
                                value={coefficinetValue}
                                onChange={handleCoeffinetChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" sx={{ "& .MuiTypography-root": { fontSize: "0.7rem" } }}>{unit2}</InputAdornment>
                                }}
                                inputProps={{
                                    step: 0.01
                                }}
                                style={{maxWidth: "500px"}}
                            />
                        </Grid>
                        <Grid item xs={3}>
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
                }
            </Grid>
        </>
    )
}

export default memo(CofDesFileInput)