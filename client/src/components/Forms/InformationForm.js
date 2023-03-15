import React, { memo, useEffect, useRef, useState } from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import TextInput from '../../toolbox/TextInput';
import Header from '../../toolbox/Header';

const formInitalState = {
    tempID: "",
    partName: "",
    partID: "",
    creator: "",
    description: "",
    validDate: { start: `${new Date().toISOString().slice(0, 10)}`, end: `${new Date().toISOString().slice(0, 10)}` },
    productionSite: { factoryName: "", address: "" },
}

const InformationForm = ({ infoData, setInfoData, tempID }) => {
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        setInfoData({ ...infoData, tempID: tempID, creator: user?.result?.name })
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setInfoData({ ...infoData, [name]: value })
    }

    console.log(infoData)
    return (
        <Grid container sx={{ mt: 2, paddingRight: "16px", margin: "10px 0 0 0px" }} spacing={1.5}>
            <TextInput label="Template Id" name="tempID" type="text" value={infoData.tempID} readOnly />
            <TextInput label="Part name" name="partName" type="text" value={infoData.partName} handleChange={handleChange} />
            <TextInput label="Part ID" name="partID" type="text" value={infoData.partID} handleChange={handleChange} />
            <TextInput label="Data collected by" name="creator" type="text" value={infoData.creator} handleChange={handleChange} />
            <Header size={3.5} variant="h5">Data Valid</Header>
            <Grid item xs={3.8}>
                <TextField fullWidth label="Start" name="validDate" type="date" value={infoData.validDate.start} onChange={(e) => setInfoData({ ...infoData, validDate: { ...infoData.validDate, start: e.target.value } })} />
            </Grid>
            <Grid item xs={0.9}>
                <Typography variant="h5"> - </Typography>
            </Grid>
            <Grid item xs={3.8}>
                <TextField fullWidth label="End" name="validDate" type="date" value={infoData.validDate.end} onChange={(e) => setInfoData({ ...infoData, validDate: { ...infoData.validDate, end: e.target.value } })} />
            </Grid>
            <Header size={3.5} variant="h5">Description</Header>
            <Grid item xs={8.5}>
                <TextField fullWidth label="Description" name="description" type="text" value={infoData.description} multiline rows={3} onChange={handleChange} />
            </Grid>
            <Header size={3.5} variant="h5">Production site</Header>
            <Grid item xs={4.25}>
                <TextField fullWidth label="Factory name" name="productionSite" type="text" value={infoData.productionSite.factoryName} onChange={(e) => setInfoData({ ...infoData, productionSite: { ...infoData.productionSite, factoryName: e.target.value } })} />
            </Grid>
            <Grid item xs={4.25}>
                <TextField fullWidth label="Address" name="address" type="text" value={infoData.productionSite.address} onChange={(e) => setInfoData({ ...infoData, productionSite: { ...infoData.productionSite, address: e.target.value } })} />
            </Grid>
        </Grid>
    )
}

export default memo(InformationForm)