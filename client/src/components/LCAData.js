import React, { useEffect } from 'react'
import moment from 'moment';

import { Button, CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import LCADataTable from '../toolbox/LCADataTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../redux/actions/postActions';

const LCAData = () => {
    const navigate = useNavigate();
    const posts = useSelector((state) => state.postReducer.allPostDatas);
    const dispatch = useDispatch();
    console.log(posts)

    return (
        <Container>
            <Typography variant='h3'>LCADatas</Typography>
            {!posts.length ? <CircularProgress style={{ marginTop: "150px" }} size="15vh" color='inherit' /> : posts.map((post) => (
                <Grid container key={post._id} style={{ margin: "10px 0 15px 0", border: "5px double grey" }} direction="column">
                    <Grid item>
                        <Grid container style={{ margin: "10px 0 15px 15px" }} direction="column" justifyContent="flex-start" alignItems="flex-start">
                            <Grid item>
                                <Button variant='contained' onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
                                <Button variant='contained' onClick={() => navigate(`/${post._id}`)}>Update</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>Part name: {post.partName} {console.log((40 / 100) * post.euro5?.value * post.euro5?.coefficinet * (post.steel.value / 2000))}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>Part ID: {post.partID}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>Data collected by: {post.creator}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>Valid date: {(post.validDate?.start && post.validDate.start !== null) && moment(post.validDate.start).format("DD/MM/YYYY")} to {(post.validDate?.end && post.validDate.end !== null) && moment(post.validDate.end).format("DD/MM/YYYY")}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h5'>Name of production site: {post.productionSite?.factoryName}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>Address: {post.productionSite?.address}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>Value</TableCell>
                                        <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>Coefficient</TableCell>
                                        <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>GHG emissions(CO2 eqv GHG kg)</TableCell>
                                        <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>File</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <LCADataTable rowName="Annual production volume of part" unit="pcs/year" value={post.annualProduction.value} file={post.annualProduction.file} />
                                    <LCADataTable rowName="Steel" unit="kg/pcs" value={post.steel.value} file={post.steel.file} />
                                    <LCADataTable rowName="Steel removed in machining" unit="kg/pcs" value={post.steelRemoved.value} coefficinet={post.steelRemoved.coefficinet} file={post.steelRemoved.file} sum={post.steelRemoved.value * post.steelRemoved.coefficinet} />
                                    <LCADataTable rowName="Part weight" unit="kg/pcs" value={post.steel.value - post.steelRemoved.value} coefficinet={post.partWeight.coefficinet} file={post.partWeight.file} sum={(post.steel.value - post.steelRemoved.value) * post.partWeight.coefficinet} />
                                    <LCADataTable rowName="Energy consumption of machining" unit="kW" value={post.energyConsumption.value} file={post.energyConsumption.file} />
                                    <LCADataTable rowName="Machining time" unit="h" value={post.machiningTime.value} file={post.machiningTime.file} sum={post.energyConsumption.value * post.machiningTime.value * post.machiningTime.coefficinet} />
                                    <LCADataTable rowName="Machining liquid consumption" unit="l/year" value={post.machiningLiquidConsumption.value} coefficinet={post.machiningLiquidConsumption.coefficinet} file={post.machiningLiquidConsumption.file} sum={(post.machiningLiquidConsumption.value / post.annualProduction.value) * post.machiningLiquidConsumption.coefficinet} />
                                    <LCADataTable rowName="Hydraulic oil consumption" unit="l/year" value={post.hydraulicOilConsumption.value} coefficinet={post.hydraulicOilConsumption.coefficinet} file={post.hydraulicOilConsumption.file} sum={(post.hydraulicOilConsumption.value / post.annualProduction.value) * post.hydraulicOilConsumption.coefficinet} />
                                    <LCADataTable rowName="Packaging plastic" unit="kg/pcs" value={post.packagingPlastic.value} coefficinet={post.packagingPlastic.coefficinet} file={post.packagingPlastic.file} sum={post.packagingPlastic.value * post.packagingPlastic.coefficinet} />
                                    <LCADataTable rowName="Oil" unit="l/year" value={post.oil.value} coefficinet={post.oil.coefficinet} file={post.oil.file} sum={(post.oil.value / post.annualProduction.value) * post.oil.coefficinet} />
                                    <LCADataTable rowName="Electricity" unit="kWh" value={post.electrycity.value} coefficinet={post.electrycity.coefficinet} file={post.electrycity.file} sum={(post.electrycity.value / post.annualProduction.value) * post.electrycity.coefficinet} />
                                    <TableRow>
                                        <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>Transportation:</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "550" }}>Track:</TableCell>
                                    </TableRow>
                                    <LCADataTable rowName="EURO5" unit="km" value={post.euro5?.value} coefficinet={post.euro5?.coefficinet} file={post.euro5?.file} sum={(40 / 100) * post.euro5?.value * post.euro5?.coefficinet * (post.steel.value / 2000)} />
                                    <LCADataTable rowName="EURO6" unit="km" value={post.euro6?.value} coefficinet={post.euro6?.coefficinet} file={post.euro6?.file} sum={(40 / 100) * post.euro6?.value * post.euro6?.coefficinet * (post.steel.value / 2000)} />
                                    <LCADataTable rowName="EURO7" unit="km" value={post.euro7?.value} coefficinet={post.euro7?.coefficinet} file={post.euro7?.file} sum={(40 / 100) * post.euro7?.value * post.euro7?.coefficinet * (post.steel.value / 2000)} />
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "550" }}>Ship:</TableCell>
                                    </TableRow>
                                    <LCADataTable rowName="RO-RO" unit="km" value={post.roro?.value} coefficinet={post.roro?.coefficinet} file={post.roro?.file} sum={(4000 / 100) * post.roro?.value * post.roro?.coefficinet * (post.steel.value / 2000000)} />
                                    <TableRow>
                                        <TableCell rowSpan={4} />
                                        <TableCell colSpan={2} style={{ fontWeight: "650" }}>Total</TableCell>
                                        <TableCell align='right' >{(post.steelRemoved.value * post.steelRemoved.coefficinet + (post.steel.value - post.steelRemoved.value) * post.partWeight.coefficinet + post.energyConsumption.value * post.machiningTime.value * post.machiningTime.coefficinet + (post.machiningLiquidConsumption.value / post.annualProduction.value) * post.machiningLiquidConsumption.coefficinet
                                            + (post.hydraulicOilConsumption.value / post.annualProduction.value) * post.hydraulicOilConsumption.coefficinet + post.packagingPlastic.value * post.packagingPlastic.coefficinet + (post.oil.value / post.annualProduction.value) * post.oil.coefficinet + (post.electrycity.value / post.annualProduction.value) * post.electrycity.coefficinet
                                            + ((40 / 100) * post.euro5?.value * post.euro5?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro6?.value * post.euro6?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro7?.value * post.euro7?.coefficinet * (post.steel.value / 2000)) + ((4000 / 100) * post.roro?.value * post.roro?.coefficinet * (post.steel.value / 2000000))).toFixed(2)} CO2 eqv GHG kg</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            ))}
        </Container>
    )
}

export default LCAData