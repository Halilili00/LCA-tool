import React, {useState, useEffect} from 'react' 
import { Button, Grid, Paper, TextField, Typography } from '@mui/material' 
import axios from 'axios'
import Input from '../toolbox/Input' 
import { useParams } from 'react-router-dom'

const Form = ({posts}) => {
    const[formData, setFormData] = useState({
        tempId: "", 
        partName: "", 
        partID: "",
        creator: "",
        validDate: {start: `${new Date().toISOString().slice(0, 10)}`, end: `${new Date().toISOString().slice(0, 10)}`},
        productionSite: {factoryName: "", address: ""},
        annualProduction: {value : 1, file: ""}, 
        steel: {value : 0, file: ""}, 
        steelRemoved: {value : 0, coefficinet: 0, file: ""},
        partWeight: {coefficinet: 0},
        energyConsumption: {value : 0, file: ""},
        machiningTime: {value : 0, coefficinet: 0, file: ""},
        machiningLiquidConsumption: {value : 0, coefficinet: 0, file: ""},
        hydraulicOilConsumption: {value : 0, coefficinet: 0, file: ""},
        packagingPlastic: {value : 0, coefficinet: 0, file: ""},
        oil: {value : 0, coefficinet: 0, file: ""},
        electrycity: {value : 0, coefficinet: 0, file: ""},
        euro5: {value : 0, coefficinet: 0, file: ""},
        euro6: {value : 0, coefficinet: 0, file: ""},
        euro7: {value : 0, coefficinet: 0, file: ""},
        roro: {value : 0, coefficinet: 0, file: ""}
    })
    const[totalSum, setTotalSum] = useState(0);
    const param = useParams();

    useEffect(() => {
      if(param.id){
        setFormData({...posts.find(post => post._id === param.id)})
        //console.log(posts.find(post => post._id === param.id))
      } else {
        setFormData({...formData, tempId: `MAC-${Math.floor(Math.random()*Date.now())}`})
      }
    },[param.id])

    useEffect(() => {
      setTotalSum((formData.steelRemoved.value * formData.steelRemoved.coefficinet) + ((formData.steel.value - formData.steelRemoved.value) * formData.partWeight.coefficinet) + (formData.energyConsumption.value * formData.machiningTime.value * formData.machiningTime.coefficinet) +((formData.machiningLiquidConsumption.value / formData.annualProduction.value) * formData.machiningLiquidConsumption.coefficinet)
      + ((formData.hydraulicOilConsumption.value / formData.annualProduction.value) * formData.hydraulicOilConsumption.coefficinet) + (formData.packagingPlastic.value * formData.packagingPlastic.coefficinet) + ((formData.oil.value / formData.annualProduction.value) * formData.oil.coefficinet) + ((formData.electrycity.value / formData.annualProduction.value) * formData.electrycity.coefficinet)
      + ((40/100) * formData.euro5.value * formData.euro5.coefficinet * (formData.steel.value/2000)) + ((40/100) * formData.euro6.value * formData.euro6.coefficinet * (formData.steel.value/2000)) + ((40/100) * formData.euro7.value * formData.euro7.coefficinet * (formData.steel.value/2000)) + ((4000/100) * formData.roro.value * formData.roro.coefficinet * (formData.steel.value/2000000)))
      console.log(totalSum)
    }, [totalSum, setTotalSum, formData])
  
    const handleChange = (e) => { 
        let {name, value, type} = e.target;
        if(type === "text"){
          setFormData({...formData, [name]: value})
        } else {
          setFormData({...formData, [name]: {...formData[name], value: parseFloat(value, 10)}})  
        }
        console.log(totalSum);
    }

    const handleCoeffinetChange = (e) => { 
      let {name, value} = e.target; 
      setFormData({...formData, [name]: {...formData[name], coefficinet: parseFloat(value, 10)}}) 
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
        let {name} = e.target;
        const base64 = await convertToBase64(file);
        setFormData({ ...formData, [name]: {...formData[name], file: {data: base64, name: fileName}}});
      };

    const handleSubmit = async(e)=> { 
        e.preventDefault(); 
        await axios.post('http://localhost:5000/posts', formData)
        alert("Data is added")
    }
    console.log(formData)

    /*const createId = () => {
      setFormData({})
    }*/
  return (
   <Paper> 
    <form onSubmit={handleSubmit}>
        <Typography variant='h3'>Machining</Typography> 
        <Grid container sx={{mt:2}} spacing={2}> 
            <Input label="Template Id" name="tempId" type="text" value={formData.tempId}/>
            <Input label="Part name" name="partName" type="text" value={formData.partName} handleChange={handleChange}/> 
            <Input label="Part ID" name="partId" type="text" value={formData.partId} handleChange={handleChange}/>
            <Input label="Data collected by" name="creator" type="text" value={formData.creator} handleChange={handleChange}/>
            <Grid item xs={3.5}>
              <Typography variant="h5" style={{margin: "10px 0 0 20px", display: "flex"}}>Data  Valid</Typography>
            </Grid>
            <Grid item xs={3.7}>
              <TextField fullWidth label="Start" name="validDate" type="date" value={formData.validDate.start} onChange={(e) => setFormData({...formData, validDate: {...formData.validDate, start: e.target.value}})}/>
            </Grid>
            <Grid item xs={0.9}>
              <Typography variant="h5"> - </Typography>
            </Grid>
            <Grid item xs={3.7}>
              <TextField fullWidth label="End" name="validDate" type="date" value={formData.validDate.end} onChange={(e) => setFormData({...formData, validDate: {...formData.validDate, end: e.target.value}})}/>
            </Grid>
            <Grid item xs={3.5}>
              <Typography variant="h5" style={{margin: "10px 0 0 20px", display: "flex"}}>Production site</Typography>
            </Grid>
            <Grid item xs={4.2}>
              <TextField fullWidth label="Factory name" name="productionSite" type="text" value={formData.productionSite.factoryName} onChange={(e) => setFormData({...formData, productionSite: {...formData.productionSite, factoryName: e.target.value}})}/>
            </Grid>
            <Grid item xs={4.1}>
              <TextField fullWidth label="Address" name="address" type="text" value={formData.productionSite.address} onChange={(e) => setFormData({...formData, productionSite: {...formData.productionSite, address: e.target.value}})}/>
            </Grid>
            <Input label="Annual Production" unit="pcs/year" name='annualProduction' type='number' value={formData.annualProduction.value} handleChange={handleChange} handleFile={(e) => handleFile(e)}/> 
            <Input label= "Steel" name='steel' unit="kg/pcs" type='number' value={formData.steel.value} handleChange={handleChange} handleFile={(e) => handleFile(e)}/>
            <Input label="Removed steel" name='steelRemoved' unit="kg/pcs" type='number' value={formData.steelRemoved.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.steelRemoved.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={formData.steelRemoved.value * formData.steelRemoved.coefficinet}/>
            <Input label="Part weight" name="partWeight" type='number' unit="kg/pcs" value={formData.steel.value - formData.steelRemoved.value} readOnly handleFile={(e) => handleFile(e)} coefficinetValue={formData.partWeight.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.steel.value - formData.steelRemoved.value) * formData.partWeight.coefficinet}/>
            <Input label="Energy consumption" name='energyConsumption' unit="kW" type='number' value={formData.energyConsumption.value} handleChange={handleChange} handleFile={(e) => handleFile(e)}/>
            <Input label="Machining time" name='machiningTime' unit="h" type='number' value={formData.machiningTime.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.machiningTime.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={formData.energyConsumption.value * formData.machiningTime.value * formData.machiningTime.coefficinet}/>
            <Input label="Machining liquid consumption" name='machiningLiquidConsumption' unit="l/year" type='number' value={formData.machiningLiquidConsumption.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.machiningLiquidConsumption.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.machiningLiquidConsumption.value / formData.annualProduction.value) * formData.machiningLiquidConsumption.coefficinet}/>
            <Input label="Hydraulic oil consumption" name='hydraulicOilConsumption' unit="l/year" type='number' value={formData.hydraulicOilConsumption.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.hydraulicOilConsumption.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.hydraulicOilConsumption.value / formData.annualProduction.value) * formData.hydraulicOilConsumption.coefficinet}/>
            <Input label="Packaging plastic" name='packagingPlastic' unit="kg/pcs" type='number' value={formData.packagingPlastic.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.packagingPlastic.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={formData.packagingPlastic.value * formData.packagingPlastic.coefficinet}/>
            <Input label="Oil" name='oil' unit="l/year" type='number' value={formData.oil.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.oil.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.oil.value / formData.annualProduction.value) * formData.oil.coefficinet}/>
            <Input label="Electrycity" name='electrycity' unit="kWh" type='number' value={formData.electrycity.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.electrycity.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(formData.electrycity.value / formData.annualProduction.value) * formData.electrycity.coefficinet}/>
            <Grid item xs={12}>
              <Typography variant='h4' style={{display:"flex", justifyContent: "flex-start"}}>Transportation: Route</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' style={{display:"flex", justifyContent: "flex-start", marginLeft: "20px"}}>Track:</Typography>
            </Grid>
            <Input label="EURO5" name="euro5" unit="km" type="number" value={formData.euro5.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.euro5.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(40/100) * formData.euro5.value * formData.euro5.coefficinet * (formData.steel.value/2000)}/>
            <Input label="EURO6" name="euro6" unit="km" type="number" value={formData.euro6.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.euro6.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(40/100) * formData.euro6.value * formData.euro6.coefficinet * (formData.steel.value/2000)}/>
            <Input label="EURO7" name="euro7" unit="km" type="number" value={formData.euro7.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.euro7.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(40/100) * formData.euro7.value * formData.euro7.coefficinet * (formData.steel.value/2000)}/>
            <Grid item xs={12}>
              <Typography variant='h4' style={{display:"flex", justifyContent: "flex-start", marginLeft: "20px"}}>Ship:</Typography>
            </Grid>
            <Input label="RO-RO" name="roro" unit="km" type="number" value={formData.roro.value} handleChange={handleChange} handleFile={(e) => handleFile(e)} coefficinetValue={formData.roro.coefficinet} handleCoeffinetChange={handleCoeffinetChange} sum={(4000/100) * formData.roro.value * formData.roro.coefficinet * (formData.steel.value/2000000)}/>
            <Grid item xs={8} mt={4}>
              <Typography variant='h3'>Total sum is: {totalSum.toFixed(2)} CO2 eqv GHG kg</Typography>
            </Grid> 
            <Grid item xs={12}>
              <Button variant="contained" type='submit' fullWidth size='large'>Submit</Button>
            </Grid>
        </Grid>  
    </form>
   </Paper> 
  )
}

export default Form