import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDialogAlert } from '../../hooks/useDialogAlert';
import usePipeSum from '../../hooks/usePipeSum';
import { deletePost } from '../../redux/actions/postActions';
import Barcode from 'react-barcode';
import moment from 'moment';
import ProcessCell from '../../toolbox/ProcessCell';
import Charts from '../../toolbox/Charts';
import FileCell from '../../toolbox/FileCell';

const PipeManufacturingPage = () => {
  const param = useParams();
  const { posts, loading, error } = useSelector((state) => state.postReducer);
  const post = posts.find((post) => post._id === param.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalSum, sums, chartCategorySums, chartSums } = usePipeSum(post);
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

  console.log(post)
  console.log(sums)
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
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} style={{ fontSize: "1rem", fontWeight: "600" }}>Material:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}></TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>Impact (kg CO2 eq)</TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>File</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "500" }}>Weight</TableCell>
                  <TableCell colSpan={4}>{post.weight.value} kg</TableCell>
                  {sums[0][2] ? <TableCell rowSpan={4}>{sums[0][2].toFixed(2)}</TableCell> : <TableCell rowSpan={2}></TableCell>}
                  <FileCell rowSpan={4} file={post.weight.file} />
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "500" }}>Material EF</TableCell>
                  <TableCell colSpan={2}>{post.materialEF.value} kg CO2 eq/kg metal</TableCell>
                  <TableCell colSpan={2} rowSpan={2}>{post.materialEF.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "500" }}>Electricity input EF</TableCell>
                  <TableCell colSpan={2}>{post.materialEF.value2} kWh/kg metal</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "500" }}>Electricity EF</TableCell>
                  <TableCell colSpan={2}>{post.electricityEF.value} kg CO2 eq/kWh</TableCell>
                  <TableCell colSpan={2}>{post.electricityEF.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} style={{ fontSize: "1rem", fontWeight: "600" }}>Transport:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}></TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>Impact (kg CO2 eq)</TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>File</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan="2" style={{ fontSize: "1rem", fontWeight: "600" }}>Lorry:</TableCell>
                  <TableCell >Distance: {post.lorry.value} km</TableCell>
                  <TableCell colSpan={3}></TableCell>
                  {sums[1][2] ? <TableCell rowSpan={2}>{sums[1][2].toFixed(2)}</TableCell> : <TableCell rowSpan={2}></TableCell>}
                  <FileCell rowSpan={2} file={post.lorry.file} />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>EF: {post.lorry.coefficinet.value} kg CO2 eq/t-km</TableCell>
                  <TableCell colSpan={2} style={{ width: "260px" }}>{post.lorry.coefficinet.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan="2" style={{ fontSize: "1rem", fontWeight: "600" }}>Sea:</TableCell>
                  <TableCell>Distance: {post.sea.value} km</TableCell>
                  <TableCell colSpan={3}></TableCell>
                  {sums[2][2] ? <TableCell rowSpan={2}>{sums[2][2].toFixed(2)}</TableCell> : <TableCell rowSpan={2}></TableCell>}
                  <FileCell rowSpan={2} file={post.sea.file} />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>EF: {post.sea.coefficinet.value} kg CO2 eq/t-km</TableCell>
                  <TableCell colSpan={2} style={{ width: "250px" }}>{post.sea.coefficinet.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} style={{ fontSize: "1rem", fontWeight: "600" }}>Mechanical process:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}></TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>Impact (kg CO2 eq)</TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}>File</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "500" }}>Electricity EF</TableCell>
                  <TableCell colSpan={2}>{post.processElectricityEF.value} kg CO2 eq/kWh</TableCell>
                  <TableCell colSpan={2}>{post.processElectricityEF.description}</TableCell>
                  <TableCell ></TableCell>
                  <FileCell rowSpan={1} file={post.processElectricityEF.file} />
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }}></TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }} colSpan={2}>Time (mins)</TableCell>
                  <TableCell style={{ fontSize: "1rem", fontWeight: "600" }} colSpan={4}>Electricity (kWh/min)</TableCell>
                </TableRow>
                <ProcessCell header="Cutting" time={post.cutting.time} electricity={post.cutting.electricity} sum={sums[3][2]} />
                <ProcessCell header="Bending" time={post.bending.time} electricity={post.bending.electricity} sum={sums[4][2]} />
                <ProcessCell header="Welding" time={post.welding.time} electricity={post.welding.electricity} sum={sums[5][2]} />
                <ProcessCell header="Pressure test" time={post.pressureTest.time} electricity={post.pressureTest.electricity} sum={sums[6][2]} />
                <ProcessCell header="Drilling" time={post.drilling.time} electricity={post.drilling.electricity} sum={sums[7][2]} />
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={4} style={{ fontWeight: "650" }}>Total impact</TableCell>
                  <TableCell >{totalSum} kg CO2 eq</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item style={{ backgroundColor: "white", marginBottom: "10px" }}>
            <Charts chartCategorySums={chartCategorySums} chartSums={chartSums} />
          </Grid>
        </Grid>
      }
    </div >
  )
}

export default PipeManufacturingPage