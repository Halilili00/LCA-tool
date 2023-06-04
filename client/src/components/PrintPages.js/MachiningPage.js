import React from 'react'
import { Button, ButtonGroup, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material'
import Charts from '../../toolbox/Charts';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { deletePost } from '../../redux/actions/postActions';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useSum from '../../hooks/useSum';
import { useDialogAlert } from '../../hooks/useDialogAlert';
import Barcode from 'react-barcode';
import CustomTableCell from '../../toolbox/CustomTableCell';

const MachiningPage = () => {
    const param = useParams();
    const { posts, loading, error } = useSelector((state) => state.postReducer);
    const post = posts.find((post) => post._id === param.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { totalSum, sums, chartCategorySums, chartSums } = useSum(post);
    const { handleOpenDialog } = useDialogAlert();

    const handleDeletePost = (tempID, id) => {
        handleOpenDialog({
            title: "You want to delte data?",
            succes: "Data is deleted",
            buttons: [
                { lable: "Delte data", navigatePage: "/LCADatas", onConfirm: () => { dispatch(deletePost(tempID, id)) } },
            ]
        })
    }

    return (
        <div>
            {loading ? <CircularProgress style={{ marginTop: "150px" }} size="15vh" color='inherit' />
                : <Grid container key={post._id} sx={{ border: "5px double grey", "@media print": { "&": { width: "100%", border: "0" } } }} direction="column">
                    <Grid item style={{ marginLeft: "10px" }}>
                        <Grid item style={{ display: "flex", justifyContent: "flex-end", padding: "5px" }}>
                            <ButtonGroup
                                sx={{
                                    "@media print": {
                                        "&":
                                            { display: "none" }
                                    }
                                }}>
                                <Button variant='contained' onClick={() => handleDeletePost(post.tempID, post._id)}>Delete</Button>
                                <Button variant='contained' onClick={() => navigate(`/Forms/${post.tempID}/${post._id}`)}>Update</Button>
                                <Button variant='contained' onClick={() => window.print()}><PictureAsPdfIcon /></Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid container direction="column" sx={{ "@media print": { "&": { margin: "10px 0 20px 0" } } }}>
                            <Grid item container spacing={2} sx={{ alignItems: "center", "@media print": { "&": { display: 'none' } } }}>
                                <Grid item>
                                    <Typography variant='h5' align="left">LCAID:</Typography>
                                </Grid>
                                <Grid item>
                                    <Barcode height={31} width={1.5} value={post.lcaID} />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} sx={{ "@media print": { "&": { justifyContent: "space-between", alignItems: "end" } } }}>
                                <Grid item>
                                    <Typography variant='h5' align="left">Part name: {post.partName}</Typography>
                                </Grid>
                                <Grid item display='none' sx={{ "@media print": { "&": { display: 'flex', justifyContent: "space-between" } } }}>
                                    <Barcode height={31} width={1.5} value={post.lcaID} />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' align="left">Part ID: {post.partID}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' align="left">Data collected by: {post.creator}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' align="left">Valid date: {(post.validDate?.start && post.validDate.start !== null) && moment(post.validDate.start).format("DD/MM/YYYY")} to {(post.validDate?.end && post.validDate.end !== null) && moment(post.validDate.end).format("DD/MM/YYYY")}</Typography>
                            </Grid>
                            <Grid item container style={{ margin: "10px 0 10px 0" }}>
                                <Grid item>
                                    <Typography variant='h5' align="left">Description:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1' align="left" style={{ whiteSpace: "pre-wrap", fontSize: "1.5rem" }}> {post.description}</Typography>
                                </Grid>

                            </Grid>
                            <Grid item>
                                <Typography variant='h5' align="left">Name of production site: {post.productionSite?.factoryName}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' align="left">Address: {post.productionSite?.address}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Typography variant=''>Row material</Typography>
                        <Table style={{ minWidth: "900px" }} size='small' aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">GHG emissions (CO2 eqv GHG kg)</TableCell>
                                    <TableCell align="right">File/Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <CustomTableCell rowName="Annual production volume of part" unit="pcs/year" value={post.annualProduction.value} file={post.annualProduction.file} />
                                <CustomTableCell rowSpan={4} rowName="Material EF" unit="kg CO2 eq/kg metal" value={post.materialEF.value} description={post.materialEF.description} file={post.materialEF.file} />
                                <CustomTableCell afterRowSpan rowName="Steel" unit="kg/pcs" value={post.steel.value} />
                                <CustomTableCell afterRowSpan rowName="Steel removed in machining" unit="kg/pcs" value={post.steelRemoved.value} sum={sums[0][2]} />
                                <CustomTableCell afterRowSpan rowName="Part weight" unit="kg/pcs" value={post.steel.value - post.steelRemoved.value} sum={sums[1][2]} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper}>
                        <Typography variant=''>Operations and Site heating</Typography>
                        <Table style={{ minWidth: "900px" }} size='small' aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">Coefficinet</TableCell>
                                    <TableCell align="right">GHG emissions (CO2 eqv GHG kg)</TableCell>
                                    <TableCell align="right">File/Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <CustomTableCell colSpan={2} rowName="Energy consumption of machining" unit="kW" value={post.energyConsumption.value} file={post.energyConsumption.file} />
                                <CustomTableCell rowName="Machining time" unit="h" value={post.machiningTime.value} coefficinet={post.machiningTime.coefficinet} file={post.machiningTime.file} sum={sums[2][2]} />
                                <CustomTableCell rowName="Machining liquid consumption" unit="l/year" value={post.machiningLiquidConsumption.value} coefficinet={post.machiningLiquidConsumption.coefficinet} file={post.machiningLiquidConsumption.file} sum={sums[3][2]} />
                                <CustomTableCell rowName="Hydraulic oil consumption" unit="l/year" value={post.hydraulicOilConsumption.value} coefficinet={post.hydraulicOilConsumption.coefficinet} file={post.hydraulicOilConsumption.file} sum={sums[4][2]} />
                                <CustomTableCell rowName="Packaging plastic" unit="kg/pcs" value={post.packagingPlastic.value} coefficinet={post.packagingPlastic.coefficinet} file={post.packagingPlastic.file} sum={sums[5][2]} />
                                <CustomTableCell rowName="Oil" unit="l/year" value={post.oil.value} coefficinet={post.oil.coefficinet} file={post.oil.file} sum={sums[6][2]} />
                                <CustomTableCell rowName="Electricity" unit="kWh" value={post.electrycity.value} coefficinet={post.electrycity.coefficinet.value} file={post.electrycity.file} sum={sums[7][2]} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper}>
                        <Typography variant=''>Transportation</Typography>
                        <Table style={{ minWidth: "900px" }} size='small' aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">GHG emissions (CO2 eqv GHG kg)</TableCell>
                                    <TableCell align="right">File/Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <CustomTableCell rowSpan={4} rowName="Track EF" unit="kg CO2 eq/t-km" value={post?.trackCof?.value} description={post.trackCof?.description} file={post.trackCof.file} />
                                <CustomTableCell afterRowSpan rowName="EURO5" unit="km" value={post.euro5?.value} sum={(40 / 100) * post.euro5?.value * post.trackCof?.value * (post.steel?.value / 2000)} />
                                <CustomTableCell afterRowSpan rowName="EURO6" unit="km" value={post.euro6?.value} sum={(40 / 100) * post.euro6?.value * post.trackCof?.value * (post.steel?.value / 2000)} />
                                <CustomTableCell afterRowSpan rowName="EURO7" unit="km" value={post.euro7?.value} sum={(40 / 100) * post.euro7?.value * post.trackCof?.value * (post.steel?.value / 2000)} />
                                <CustomTableCell rowSpan={2} rowName="Ship EF" unit="kg CO2 eq/t-km" value={post?.shipCof?.value} description={post.shipCof?.description} file={post.shipCof.file} />
                                <CustomTableCell afterRowSpan rowName="RO-RO" unit="km" value={post.roro?.value} sum={sums[9][2]} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item container margin="20px 0 20px 0">
                        <Grid item xs={6} >
                            <Typography variant=''>Total emission: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant=''>{totalSum} CO2 eqv GHG kg</Typography>
                        </Grid>
                    </Grid>
                    {totalSum > 0 && <Grid item style={{ backgroundColor: "white", marginBottom: "10px" }}>
                        <Charts chartCategorySums={chartCategorySums} chartSums={chartSums} />
                    </Grid>}
                </Grid>
            }
        </div>
    )
}

export default MachiningPage