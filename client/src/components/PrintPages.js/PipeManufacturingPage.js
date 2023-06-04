import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDialogAlert } from '../../hooks/useDialogAlert';
import usePipeSum from '../../hooks/usePipeSum';
import { deletePost } from '../../redux/actions/postActions';
import Barcode from 'react-barcode';
import moment from 'moment';
import Charts from '../../toolbox/Charts';
import CustomTableCell from '../../toolbox/CustomTableCell';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    fontWeight: 500,
  },
}));

const PipeManufacturingPage = () => {
  const param = useParams();
  const { posts, loading, error } = useSelector((state) => state.postReducer);
  const post = posts.find((post) => post._id === param.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalSum, sums, chartCategorySums, chartSums } = usePipeSum(post);
  const { handleOpenDialog } = useDialogAlert();
  const [pageBrake, setPageBrake] = useState('avoid');


  const handleDeletePost = (tempID, id) => {
    handleOpenDialog({
      title: "You want to delte data?",
      succes: "Data is deleted",
      buttons: [
        { lable: "Delte data", navigatePage: "/LCADatas", onConfirm: () => { dispatch(deletePost(tempID, id)) } },
      ]
    })
  }

  useEffect(() => {
    if(totalSum>0){
      setPageBrake('always')
    }
  }, [])

  //console.log(post)
  //console.log(sums)
  console.log(pageBrake)
  //console.log(JSON.stringify(post))
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
            <Grid container direction="column" sx={{ "@media print": { "&": {} } }}>
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
            <Typography variant=''>Material</Typography>
            <Table style={{ minWidth: "900px" }} size='small' aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Impact (kg CO2 eq)</TableCell>
                  <TableCell align="right">File/Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableCell rowName="Weight" unit="kg" value={post.weight.value} file={post.weight.file} />
                <CustomTableCell rowSpan={2} rowName="Material EF" unit="kg CO2 eq/kg metal" value={post.materialEF.value} description={post.materialEF.description} />
                <CustomTableCell afterRowSpan rowName="Electricity input EF" unit="kWh/kg metal" value={post.materialEF.value2} />
                <CustomTableCell rowName="Electricity EF" unit="kg CO2 eq/kWh" value={post.electricityEF.value} description={post.electricityEF.description} />
                <TableRow>
                  <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}>Mateiral total Impact:</TableCell>
                  <TableCell></TableCell>
                  <TableCell align='right' style={{ minWidth: "226px" }}>{sums[0][2].toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Typography variant=''>Transport</Typography>
            <Table style={{ minWidth: "900px" }} size='small' aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                  <TableCell align="right">Distance (km)</TableCell>
                  <TableCell align="right">EF (kg CO2 eq/t-km)</TableCell>
                  <TableCell align="right">Impact (kg CO2 eq)</TableCell>
                  <TableCell align="right">File/Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableCell rowName="Land" value={post.land.value} coefficinet={post.land.coefficinet.value} description={post.land.coefficinet.description} file={post.land.file} sum={sums[1][2]} />
                <CustomTableCell rowName="Land2" value={post.land.value} coefficinet={post.land2.coefficinet.value} description={post.land2.coefficinet.description} file={post.land2.file} sum={sums[2][2]} />
                <CustomTableCell rowName="Water" value={post.water.value} coefficinet={post.water.coefficinet.value} description={post.water.coefficinet.description} file={post.water.file} sum={sums[3][2]} />
                <CustomTableCell rowName="Air" value={post.air.value} coefficinet={post.air.coefficinet.value} description={post.air.coefficinet.description} file={post.air.file} sum={sums[4][2]} />
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Typography variant=''>Mechanical process</Typography>
            <Table style={{ minWidth: "1000px" }} size='small' aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                  <TableCell align="right">Time (mins)</TableCell>
                  <TableCell align="right">Electricity (kWh/min)</TableCell>
                  <TableCell align="right">Electricity EF (kg CO2 eq/kWh)</TableCell>
                  <TableCell align="right">Impact (kg CO2 eq)</TableCell>
                  <TableCell align="right">File/Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableCell rowSpan={5} rowName="Cutting" value={post.cutting.time} coefficinet={post.cutting.electricity} coefficinet2={post.processElectricityEF.value} file={post.processElectricityEF.file} sum={sums[5][2]} />
                <CustomTableCell afterRowSpan rowName="Bending" value={post.bending.time} coefficinet={post.bending.electricity} coefficinet2={post.processElectricityEF.value} sum={sums[6][2]} />
                <CustomTableCell afterRowSpan rowName="Welding" value={post.welding.time} coefficinet={post.welding.electricity} coefficinet2={post.processElectricityEF.value} sum={sums[7][2]} />
                <CustomTableCell afterRowSpan rowName="Pressure test" value={post.pressureTest.time} coefficinet={post.pressureTest.electricity} coefficinet2={post.processElectricityEF.value} sum={sums[8][2]} />
                <CustomTableCell afterRowSpan rowName="Drilling" value={post.drilling.time} coefficinet={post.drilling.electricity} coefficinet2={post.processElectricityEF.value} sum={sums[9][2]} />
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Typography variant=''>Other input and Output</Typography>
            <Table style={{ minWidth: "900px" }} size='small' aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ position: "sticky", left: 0, backgroundColor: "white" }}></TableCell>
                  <TableCell align="right">Value (kg)</TableCell>
                  <TableCell align="right">EF (kg CO2 eq/t-km)</TableCell>
                  <TableCell align="right">Impact (kg CO2 eq)</TableCell>
                  <TableCell align="right">File/Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableCell rowName="Tap water" value={post.tapWater.value} coefficinet={post.tapWater.coefficinet.value} description={post.tapWater.coefficinet.description} sum={sums[10][2]} file={post.tapWater.file} />
                <CustomTableCell rowName="Lubricating oil" value={post.lubricatingOil.value} coefficinet={post.lubricatingOil.coefficinet.value} description={post.lubricatingOil.coefficinet.description} sum={sums[11][2]} file={post.lubricatingOil.file} />
                <CustomTableCell rowName="Cutting fluid" value={post.cuttingFluid.value} coefficinet={post.cuttingFluid.coefficinet.value} description={post.cuttingFluid.coefficinet.description} sum={sums[12][2]} file={post.cuttingFluid.file} />
                <CustomTableCell rowName="Cardboard pacakging" value={post.cardboardPacakging.value} coefficinet={post.cardboardPacakging.coefficinet.value} description={post.cardboardPacakging.coefficinet.description} sum={sums[13][2]} file={post.cardboardPacakging.file} />
                <CustomTableCell rowName="Plastic film packaging" value={post.plasticFilmPackaging.value} coefficinet={post.plasticFilmPackaging.coefficinet.value} description={post.plasticFilmPackaging.coefficinet.description} sum={sums[14][2]} file={post.plasticFilmPackaging.file} />
                <CustomTableCell rowName="Product" value={post.outputProduct.value} coefficinet={post.outputProduct.coefficinet.value} description={post.outputProduct.coefficinet.description} sum={sums[15][2]} file={post.outputProduct.file} />
                <CustomTableCell rowName="Lubricating oil waste" value={post.lubricatingOilWaste.value} coefficinet={post.lubricatingOilWaste.coefficinet.value} description={post.lubricatingOilWaste.coefficinet.description} sum={sums[16][2]} file={post.lubricatingOilWaste.file} />
                <CustomTableCell rowName="Cutting fluid waste" value={post.cuttingFluidWaste.value} coefficinet={post.cuttingFluidWaste.coefficinet.value} description={post.cuttingFluidWaste.coefficinet.description} sum={sums[17][2]} file={post.cuttingFluidWaste.file} />
                <CustomTableCell rowName="Wastewater" value={post.wastewater.value} coefficinet={post.wastewater.coefficinet.value} description={post.wastewater.coefficinet.description} sum={sums[18][2]} file={post.wastewater.file} />
                <CustomTableCell rowName="Metal scrap" value={post.metalScrap.value} coefficinet={post.metalScrap.coefficinet.value} description={post.metalScrap.coefficinet.description} sum={sums[19][2]} file={post.metalScrap.file} />
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item container margin="20px 0 0px 0">
            <Grid item xs={6}>
              <Typography variant=''>Total emission: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant=''>{totalSum} CO2 eqv GHG kg</Typography>
            </Grid>
          </Grid>
          {totalSum>0 && <Grid item style={{ backgroundColor: "white", marginBottom: "10px" }}>
            <Charts chartCategorySums={chartCategorySums} chartSums={chartSums} pageBrake={pageBrake} />
          </Grid>}
        </Grid>
      }
    </div >
  )
}

export default PipeManufacturingPage