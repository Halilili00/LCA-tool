import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import LCADataTable from '../toolbox/LCADataTable';
import Charts from '../toolbox/Charts';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { deletePost } from '../redux/actions/postActions';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useSum from '../hooks/useSum';

const LCAPrintPage = () => {
    const param = useParams();
    const post = useSelector((state) => (param.id ? state.postReducer.allPostDatas.find((post) => post._id === param.id) : null));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { totalSum, sums } = useSum(post);

    console.log(post)
    console.log(sums)
    return (
        <div>
            {post && <Grid container key={post._id} style={{ margin: "10px 0 15px 0", border: "5px double grey" }} direction="column">
                <Grid item>
                    <Grid container style={{ margin: "10px 0 15px 15px" }} direction="column" justifyContent="flex-start" alignItems="flex-start">
                        <Grid item>
                            <Button variant='contained' onClick={() => dispatch(deletePost(post._id, navigate))}>Delete</Button>
                            <Button variant='contained' onClick={() => navigate(`/Forms/${post._id}`)}>Update</Button>
                            <Button variant='contained' onClick={() => window.print()}><PictureAsPdfIcon /></Button>
                        </Grid>
                        <Grid item>
                            <Typography variant='h5'>Part name: {post.partName}</Typography>
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
                        <Table aria-label="simple table">
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
                                <LCADataTable rowName="Steel removed in machining" unit="kg/pcs" value={post.steelRemoved.value} coefficinet={post.steelRemoved.coefficinet} file={post.steelRemoved.file} sum={sums[0][2]} />
                                <LCADataTable rowName="Part weight" unit="kg/pcs" value={post.steel.value - post.steelRemoved.value} coefficinet={post.partWeight.coefficinet} file={post.partWeight.file} sum={sums[1][2]} />
                                <LCADataTable rowName="Energy consumption of machining" unit="kW" value={post.energyConsumption.value} file={post.energyConsumption.file} />
                                <LCADataTable rowName="Machining time" unit="h" value={post.machiningTime.value} file={post.machiningTime.file} sum={sums[2][2]} />
                                <LCADataTable rowName="Machining liquid consumption" unit="l/year" value={post.machiningLiquidConsumption.value} coefficinet={post.machiningLiquidConsumption.coefficinet} file={post.machiningLiquidConsumption.file} sum={sums[3][2]} />
                                <LCADataTable rowName="Hydraulic oil consumption" unit="l/year" value={post.hydraulicOilConsumption.value} coefficinet={post.hydraulicOilConsumption.coefficinet} file={post.hydraulicOilConsumption.file} sum={sums[4][2]} />
                                <LCADataTable rowName="Packaging plastic" unit="kg/pcs" value={post.packagingPlastic.value} coefficinet={post.packagingPlastic.coefficinet} file={post.packagingPlastic.file} sum={sums[5][2]} />
                                <LCADataTable rowName="Oil" unit="l/year" value={post.oil.value} coefficinet={post.oil.coefficinet} file={post.oil.file} sum={sums[6][2]} />
                                <LCADataTable rowName="Electricity" unit="kWh" value={post.electrycity.value} coefficinet={post.electrycity.coefficinet} file={post.electrycity.file} sum={sums[7][2]} />
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
                                <LCADataTable rowName="RO-RO" unit="km" value={post.roro?.value} coefficinet={post.roro?.coefficinet} file={post.roro?.file} sum={sums[9][2]} />
                                <TableRow>
                                    <TableCell rowSpan={4} />
                                    <TableCell colSpan={2} style={{ fontWeight: "650" }}>Total</TableCell>
                                    <TableCell align='right' >{totalSum} CO2 eqv GHG kg</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item style={{ backgroundColor: "white", marginBottom: "10px" }}>
                    <Charts post={post} />
                </Grid>
            </Grid>
            }
        </div>
    )
}

export default LCAPrintPage