import React from 'react'
import { Button, ButtonGroup, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material'
import LCADataTable from '../../toolbox/LCADataTable';
import Charts from '../../toolbox/Charts';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { deletePost } from '../../redux/actions/postActions';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useSum from '../../hooks/useSum';
import { useDialogAlert } from '../../hooks/useDialogAlert';
import Barcode from 'react-barcode';
import useComponentHeight from '../../hooks/useComponentHeight';

const LCAPrintPage = () => {
    const param = useParams();
    const { posts, loading, error } = useSelector((state) => state.postReducer);
    const post = posts.find((post) => post._id === param.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { totalSum, sums, chartCategorySums, chartSums } = useSum(post);
    const { handleOpenDialog } = useDialogAlert();
    //const myComponentRef = useRef(null);
    //const [myComponentHeight, setMyComponentHeight] = useState(0);


    const handleDeletePost = (tempID, id) => {
        handleOpenDialog({
            title: "You want to delte data?",
            succes: "Data is deleted",
            buttons: [
                { lable: "Delte data", navigatePage: "/LCADatas", onConfirm: () => { dispatch(deletePost(tempID, id)) } },
            ]
        })
    }

    /*useEffect(() => {
        setTimeout(() => {
            setMyComponentHeight(myComponentRef.current.clientHeight)
        }, 500);
    }, [post])*/

    //console.log(JSON.stringify(post))
    console.log(sums)
    //console.log(myComponentHeight)
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
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead >
                                <TableRow >
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600", position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>Value</TableCell>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600" }} colSpan={2}></TableCell>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>GHG emissions (CO2 eqv GHG kg)</TableCell>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>File</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600", position: "sticky", left: 0, backgroundColor: "white" }}>Raw material:</TableCell>
                                </TableRow>
                                <LCADataTable rowName="Annual production volume of part" unit="pcs/year" value={post.annualProduction.value} file={post.annualProduction.file} />
                                <LCADataTable rowName="Material EF" unit="kg CO2 eq/kg metal" value={post.materialEF.value} description={post.materialEF.description} file={post.materialEF.file} />
                                <LCADataTable rowName="Steel" unit="kg/pcs" value={post.steel.value} />
                                <LCADataTable rowName="Steel removed in machining" unit="kg/pcs" value={post.steelRemoved.value} sum={sums[0][2]} />
                                <LCADataTable rowName="Part weight" unit="kg/pcs" value={post.steel.value - post.steelRemoved.value} sum={sums[1][2]} />
                                <TableRow>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600", position: "sticky", left: 0, backgroundColor: "white" }}>Operations:</TableCell>
                                </TableRow>
                                <LCADataTable rowName="Energy consumption of machining" unit="kW" value={post.energyConsumption.value} file={post.energyConsumption.file} />
                                <LCADataTable rowName="Machining time" unit="h" value={post.machiningTime.value} coefficinet={post.machiningTime.coefficinet} file={post.machiningTime.file} sum={sums[2][2]} />
                                <LCADataTable rowName="Machining liquid consumption" unit="l/year" value={post.machiningLiquidConsumption.value} coefficinet={post.machiningLiquidConsumption.coefficinet} file={post.machiningLiquidConsumption.file} sum={sums[3][2]} />
                                <LCADataTable rowName="Hydraulic oil consumption" unit="l/year" value={post.hydraulicOilConsumption.value} coefficinet={post.hydraulicOilConsumption.coefficinet} file={post.hydraulicOilConsumption.file} sum={sums[4][2]} />
                                <LCADataTable rowName="Packaging plastic" unit="kg/pcs" value={post.packagingPlastic.value} coefficinet={post.packagingPlastic.coefficinet} file={post.packagingPlastic.file} sum={sums[5][2]} />
                                <TableRow>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600", position: "sticky", left: 0, backgroundColor: "white" }}>Site heating:</TableCell>
                                </TableRow>
                                <LCADataTable rowName="Oil" unit="l/year" value={post.oil.value} coefficinet={post.oil.coefficinet} file={post.oil.file} sum={sums[6][2]} />
                                <LCADataTable rowName="Electricity" unit="kWh" value={post.electrycity.value} coefficinet={post.electrycity.coefficinet.value} file={post.electrycity.file} sum={sums[7][2]} />
                                <TableRow>
                                    <TableCell style={{ fontSize: "1rem", fontWeight: "600", position: "sticky", left: 0, backgroundColor: "white" }}>Transportation:</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "550", position: "sticky", left: 0, backgroundColor: "white" }}>Track:</TableCell>
                                </TableRow>
                                <LCADataTable rowName="EF" unit="kg CO2 eq/t-km" value={post?.trackCof?.value} description={post.trackCof?.description} file={post.trackCof.file} />
                                <LCADataTable rowName="EURO5" unit="km" value={post.euro5?.value} sum={(40 / 100) * post.euro5?.value * post.trackCof?.value * (post.steel?.value / 2000)} />
                                <LCADataTable rowName="EURO6" unit="km" value={post.euro6?.value} sum={(40 / 100) * post.euro6?.value * post.trackCof?.value * (post.steel?.value / 2000)} />
                                <LCADataTable rowName="EURO7" unit="km" value={post.euro7?.value} sum={(40 / 100) * post.euro7?.value * post.trackCof?.value * (post.steel?.value / 2000)} />
                                <TableRow>
                                    <TableCell style={{ fontWeight: "550", position: "sticky", left: 0, backgroundColor: "white" }}>Ship:</TableCell>
                                </TableRow>
                                <LCADataTable rowName="EF" unit="kg CO2 eq/t-km" value={post?.shipCof?.value} description={post.shipCof?.description} file={post.shipCof.file} />
                                <LCADataTable rowName="RO-RO" unit="km" value={post.roro?.value} sum={sums[9][2]} />
                                <TableRow>
                                    <TableCell rowSpan={4} />
                                    <TableCell colSpan={3} style={{ fontWeight: "650" }}>Total</TableCell>
                                    <TableCell align='right' >{totalSum} CO2 eqv GHG kg</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item style={{ backgroundColor: "white", marginBottom: "10px" }}>
                        <Charts chartCategorySums={chartCategorySums} chartSums={chartSums} />
                    </Grid>
                </Grid>
            }
        </div>
    )
}

export default LCAPrintPage