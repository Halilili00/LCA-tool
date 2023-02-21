import React, { useState, useEffect } from 'react'
import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import Input from '../toolbox/Input'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../redux/actions/postActions'
import useSum from '../hooks/useSum'
import { useDialogAlert } from '../hooks/useDialogAlert'
import TabPanel from '../toolbox/TabPanel'
import TextInput from '../toolbox/TextInput'

const formInitalState = {
  tempID: "",
  partName: "",
  partID: "",
  creator: "",
  validDate: { start: `${new Date().toISOString().slice(0, 10)}`, end: `${new Date().toISOString().slice(0, 10)}` },
  productionSite: { factoryName: "", address: "" },
  annualProduction: { value: 1, file: "" },
  steel: { value: 0, file: "" },
  steelRemoved: { value: 0, coefficinet: 0, file: "" },
  partWeight: { coefficinet: 0 },
  energyConsumption: { value: 0, file: "" },
  machiningTime: { value: 0, coefficinet: 0, file: "" },
  machiningLiquidConsumption: { value: 0, coefficinet: 0, file: "" },
  hydraulicOilConsumption: { value: 0, coefficinet: 0, file: "" },
  packagingPlastic: { value: 0, coefficinet: 0, file: "" },
  oil: { value: 0, coefficinet: 0, file: "" },
  electrycity: { value: 0, coefficinet: 0, file: "" },
  euro5: { value: 0, coefficinet: 0, file: "" },
  euro6: { value: 0, coefficinet: 0, file: "" },
  euro7: { value: 0, coefficinet: 0, file: "" },
  roro: { value: 0, coefficinet: 0, file: "" }
}

const tabOptions = [{ label: "Machingins", value: "MAC-0001" }, { label: "Temp2", value: "MAC-0002" }]

const Form = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [formData, setFormData] = useState(formInitalState)
  const param = useParams();
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.postReducer);
  const postToUpdate = posts.find((post) => post._id === param.id);
  const { totalSum } = useSum(formData);
  const { handleOpenDialog } = useDialogAlert();
  const [TabsP, tabValue] = TabPanel(tabOptions);

  useEffect(() => {
    if (param.id && postToUpdate) {
      console.log(postToUpdate.validDate.start.slice(0, 10))
      //setFormData(postToUpdate)
      setFormData({ ...postToUpdate, validDate: { start: postToUpdate.validDate.start.slice(0, 10), end: postToUpdate.validDate.end.slice(0, 10) } })
    } else {
      setFormData({ ...formInitalState, tempID: "MAC-0001", creator: user?.result?.name })
    }
  }, [param.id, postToUpdate])

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (type === "text") {
      setFormData({ ...formData, [name]: value })
    } else {
      setFormData({ ...formData, [name]: { ...formData[name], value: parseFloat(value, 10) } })
    }
  }

  const handleCoeffinetChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: { ...formData[name], coefficinet: parseFloat(value, 10) } })
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    let { name } = e.target;
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, [name]: { ...formData[name], file: { data: base64, name: fileName } } });
  };

  const handleDeleteFile = (e) => {
    let { name} = e.target;
    console.log(name)
    setFormData({ ...formData, [name]: { ...formData[name], file: ""} })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (param.id) {
      handleOpenDialog({
        title: "You want to update data?",
        succes: "Data is updated",
        buttons: [
          { lable: "Update and go LCAData page", navigatePage: "/LCADatas", onConfirm: () => {dispatch(updatePost(formData._id,formData))} },
          { lable: "Update and stay in form", onConfirm: () => {dispatch(updatePost(formData._id,formData))}}
        ]
      })
    } else {
      handleOpenDialog({
        title: "You want to save data?",
        succes: "Data is saved",
        buttons: [
          { lable: "Save and go LCAData page", navigatePage: "/LCADatas", onConfirm: () => { dispatch(createPost(formData)) } },
          { lable: "Save and clear form", onConfirm: () => { dispatch(createPost(formData)); setFormData({ ...formInitalState, tempID: `MAC-0001`, creator: user?.result?.name })}}
        ]
      })
    }
  }

  console.log(formData)
  return (
    <Paper>
      <form onSubmit={handleSubmit} style={{ margin: "0 0 0 20px"}}>
        <TabsP/>
        {tabOptions.map((tabOption, index) => tabOption.value === tabValue ? <Typography key={index} variant='h3'>{tabOption.label}</Typography> : null)}
        <Grid container sx={{ mt: 2, paddingRight: "16px" }} spacing={1.5}>
          <TextInput label="Template Id" name="tempID" type="text" value={formData.tempID} readOnly/>
          <TextInput label="Part name" name="partName" type="text" value={formData.partName} handleChange={handleChange} />
          <TextInput label="Part ID" name="partID" type="text" value={formData.partID} handleChange={handleChange} />
          <TextInput label="Data collected by" name="creator" type="text" value={formData.creator} handleChange={handleChange} />
          <Grid item xs={3.5}>
            <Typography variant="h5" align="left">Data  Valid</Typography>
          </Grid>
          <Grid item xs={3.8}>
            <TextField fullWidth label="Start" name="validDate" type="date" value={formData.validDate.start} onChange={(e) => setFormData({ ...formData, validDate: { ...formData.validDate, start: e.target.value } })} />
          </Grid>
          <Grid item xs={0.9}>
            <Typography variant="h5"> - </Typography>
          </Grid>
          <Grid item xs={3.8}>
            <TextField fullWidth label="End" name="validDate" type="date" value={formData.validDate.end} onChange={(e) => setFormData({ ...formData, validDate: { ...formData.validDate, end: e.target.value } })} />
          </Grid>
          <Grid item xs={3.5}>
            <Typography variant="h5" align="left">Production site</Typography>
          </Grid>
          <Grid item xs={4.25}>
            <TextField fullWidth label="Factory name" name="productionSite" type="text" value={formData.productionSite.factoryName} onChange={(e) => setFormData({ ...formData, productionSite: { ...formData.productionSite, factoryName: e.target.value } })} />
          </Grid>
          <Grid item xs={4.25}>
            <TextField fullWidth label="Address" name="address" type="text" value={formData.productionSite.address} onChange={(e) => setFormData({ ...formData, productionSite: { ...formData.productionSite, address: e.target.value } })} />
          </Grid>
          <Input label="Annual Production" unit="pcs/year" name='annualProduction' type='number' value={formData.annualProduction.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} fileValue={formData.annualProduction.file} handleDeleteFile={(e) => handleDeleteFile(e)} />
          <Grid item xs={12}>
            <Typography variant='h4' align="left">Raw material:</Typography>
          </Grid>
          <Input label="Steel" name='steel' unit="kg/pcs" type='number' value={formData.steel.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} fileValue={formData.steel.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="Removed steel" name='steelRemoved' unit="kg/pcs" type='number' value={formData.steelRemoved.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.steelRemoved.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={formData.steelRemoved.value * formData.steelRemoved.coefficinet} fileValue={formData.steelRemoved.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="Part weight" name="partWeight" type='number' unit="kg/pcs" value={formData.steel.value - formData.steelRemoved.value} readOnly handleFile={(e) => handleFile(e)} coefficinetValue={formData.partWeight.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.steel.value - formData.steelRemoved.value) * formData.partWeight.coefficinet} fileValue={formData.partWeight.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Grid item xs={12}>
            <Typography variant='h4' align="left">Operations:</Typography>
          </Grid>
          <Input label="Energy consumption" name='energyConsumption' unit="kW" type='number' value={formData.energyConsumption.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} fileValue={formData.energyConsumption.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="Machining time" name='machiningTime' unit="h" type='number' value={formData.machiningTime.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.machiningTime.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={formData.energyConsumption.value * formData.machiningTime.value * formData.machiningTime.coefficinet} fileValue={formData.machiningTime.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="Machining liquid consumption" name='machiningLiquidConsumption' unit="l/year" type='number' value={formData.machiningLiquidConsumption.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.machiningLiquidConsumption.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.machiningLiquidConsumption.value / formData.annualProduction.value) * formData.machiningLiquidConsumption.coefficinet} fileValue={formData.machiningLiquidConsumption.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="Hydraulic oil consumption" name='hydraulicOilConsumption' unit="l/year" type='number' value={formData.hydraulicOilConsumption.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.hydraulicOilConsumption.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.hydraulicOilConsumption.value / formData.annualProduction.value) * formData.hydraulicOilConsumption.coefficinet} fileValue={formData.hydraulicOilConsumption.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="Packaging plastic" name='packagingPlastic' unit="kg/pcs" type='number' value={formData.packagingPlastic.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.packagingPlastic.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={formData.packagingPlastic.value * formData.packagingPlastic.coefficinet} fileValue={formData.packagingPlastic.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Grid item xs={12}>
            <Typography variant='h4' align="left">Site heating</Typography>
          </Grid>
          <Input label="Oil" name='oil' unit="l/year" type='number' value={formData.oil.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.oil.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.oil.value / formData.annualProduction.value) * formData.oil.coefficinet} fileValue={formData.oil.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="Electrycity" name='electrycity' unit="kWh" type='number' value={formData.electrycity.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.electrycity.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.electrycity.value / formData.annualProduction.value) * formData.electrycity.coefficinet} fileValue={formData.electrycity.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Grid item xs={12}>
            <Typography variant='h4' align="left">Transportation: Route</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4' align="left">Track:</Typography>
          </Grid>
          <Input label="EURO5" name="euro5" unit="km" type="number" value={formData.euro5.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.euro5.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(40 / 100) * formData.euro5.value * formData.euro5.coefficinet * (formData.steel.value / 2000)} fileValue={formData.euro5.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="EURO6" name="euro6" unit="km" type="number" value={formData.euro6.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.euro6.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(40 / 100) * formData.euro6.value * formData.euro6.coefficinet * (formData.steel.value / 2000)} fileValue={formData.euro6.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Input label="EURO7" name="euro7" unit="km" type="number" value={formData.euro7.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.euro7.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(40 / 100) * formData.euro7.value * formData.euro7.coefficinet * (formData.steel.value / 2000)} fileValue={formData.euro7.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Grid item xs={12}>
            <Typography variant='h4' align="left">Ship:</Typography>
          </Grid>
          <Input label="RO-RO" name="roro" unit="km" type="number" value={formData.roro.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.roro.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(4000 / 100) * formData.roro.value * formData.roro.coefficinet * (formData.steel.value / 2000000)} fileValue={formData.roro.file} handleDeleteFile={(e) => handleDeleteFile(e)}/>
          <Grid item xs={12} mt={4}>
            <Typography variant='h3'>Total sum is: {totalSum} CO2 eqv GHG kg</Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "20px"}}>
            {loading ? <Button variant="contained" type='submit' fullWidth size='large' startIcon={<CircularProgress size="1rem" style={{marginRight: "10px"}}/>} disabled>{param.id ? "Update" : "Submit"}</Button> 
            : <Button variant="contained" type='submit' fullWidth size='large'>{param.id ? "Update" : "Submit"}</Button>}
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Form