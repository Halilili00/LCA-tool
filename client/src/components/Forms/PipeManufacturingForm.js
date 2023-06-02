import React, { useCallback, useEffect, useState } from 'react'
import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import Input from '../../toolbox/Input';
import InformationForm from './InformationForm';
import Header from '../../toolbox/Header';
import { useDialogAlert } from '../../hooks/useDialogAlert';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/postActions';
import { useParams } from 'react-router-dom';
import CofDesInput from '../../toolbox/CofDesInput';
import usePipeSum from '../../hooks/usePipeSum';
import TimeElecInput from '../../toolbox/TimeElecInput';
import CofDesFileInput from '../../toolbox/CofDesFileInput';
import {transportEFOptions, electricityEFOptions, materialEFOptions, efOfOtherProcess} from '../../consts/options.js';


const formInfoState = {
    tempID: "",
    partName: "",
    partID: "",
    creator: "",
    description: "",
    validDate: { start: `${new Date().toISOString().slice(0, 10)}`, end: `${new Date().toISOString().slice(0, 10)}` },
    productionSite: { factoryName: "", address: "" },
}

const formCalculationState = {
    weight: { value: 1, file: "" },
    materialEF: { value: 0, value2: 0, description: "" },
    electricityEF: { value: 0, description: "" },
    land: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    land2: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    water: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    air: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    processElectricityEF: { value: 0, description: "", file: ""},
    cutting: { time: 0, electricity: 0},
    bending: { time: 0, electricity: 0},
    welding: { time: 0, electricity: 0},
    pressureTest: { time: 0, electricity: 0},
    drilling: { time: 0, electricity: 0},
    tapWater: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    lubricatingOil: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    cuttingFluid: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    cardboardPacakging: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    plasticFilmPackaging: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    outputProduct: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    lubricatingOilWaste: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    cuttingFluidWaste: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    wastewater: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    metalScrap: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
}

const PipeManufacturingForm = () => {
    const [infoData, setInfoData] = useState(formInfoState);
    const [calculationData, setCalculationData] = useState(formCalculationState);
    const dispatch = useDispatch();
    const param = useParams();
    const { handleOpenDialog } = useDialogAlert();
    const { posts, loading, error } = useSelector((state) => state.postReducer);
    const postToUpdate = posts.find((post) => post._id === param.id);
    const { totalSum, sums } = usePipeSum(calculationData);

    useEffect(() => {
        if (param.id && postToUpdate) {
            setInfoData(Object.assign({}, ...Object.keys(infoData).map(key => ({ [key]: { ...postToUpdate, validDate: { start: postToUpdate.validDate.start.slice(0, 10), end: postToUpdate.validDate.end.slice(0, 10) } }[key] }))))
            setCalculationData(Object.assign({}, ...Object.keys(calculationData).map(key => ({ [key]: postToUpdate[key] }))))
        }
    }, [param.id, postToUpdate])

    const handleChangeNumber = useCallback((e) => {
        let { name, value } = e.target;
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: parseFloat(value, 10) } })
    }, [calculationData])

    const handleChangeTime = useCallback((e) => {
        let { name, value } = e.target;
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], time: parseFloat(value, 10) } })
    }, [calculationData])

    const handleChangeElectricity = useCallback((e) => {
        let { name, value } = e.target;
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], electricity: parseFloat(value, 10) } })
    }, [calculationData])

    const handleCoeffinetChangeValue = useCallback((e) => {
        let { name, value } = e.target;
        if (calculationData[name].coefficinet) {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], coefficinet: { value: parseFloat(value, 10), description: calculationData[name].coefficinet.description } } })
        } else {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: parseFloat(value, 10), description: calculationData[name].description } })
        }
    }, [calculationData])

    const handleCoeffinetChangeDescription = useCallback((e) => {
        let { name, value } = e.target;
        if (calculationData[name].coefficinet) {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], coefficinet: { description: value, value: calculationData[name].coefficinet.value } } })
        } else {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], description: value, value: calculationData[name].value } })
        }
    }, [calculationData])

    const handleFile = useCallback((e) => {
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        let { name } = e.target;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], file: { data: fileReader.result, name: fileName } } });
        };
    }, [calculationData]);

    const handleDeleteFile = useCallback((e) => {
        let { name } = e.target;
        //console.log(name)
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], file: "" } })
    }, [calculationData]);

    const handleSelection = useCallback((e, options) => {
        let { name, value } = e.target;
        const chosen = options.find(({id}) => id === value)
        //console.log(Array.isArray(calculationData[name]))
        if (calculationData[name].coefficinet) {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], coefficinet: { value: parseFloat(chosen.value, 10), description: calculationData[name].coefficinet.description } } })
        } else {
            if(name === "materialEF"){
                setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: parseFloat(chosen.value, 10), value2: parseFloat(chosen.value2, 10), description: calculationData[name].description } })
            } else {
                setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: parseFloat(chosen.value, 10), description: calculationData[name].description } })
            }
        }
    }, [calculationData])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (param.id) {
            handleOpenDialog({
                title: "You want to update data?",
                succes: "Data is updated",
                buttons: [
                    { lable: "Update and go Calculations", navigatePage: "/LCADatas", onConfirm: () => { dispatch(updatePost(postToUpdate.tempID, param.id, Object.assign({}, postToUpdate, Object.assign(infoData, calculationData)))) } },
                    { lable: "Update and stay in form", onConfirm: () => { dispatch(updatePost(postToUpdate.tempID, param.id, Object.assign({}, postToUpdate, Object.assign(infoData, calculationData)))) } }
                ]
            })
        } else {
            handleOpenDialog({
                title: "You want to save data?",
                succes: "Data is saved",
                buttons: [
                    { lable: "Save and go Calculations", navigatePage: "/LCADatas", onConfirm: () => { dispatch(createPost(infoData.tempID, Object.assign(infoData, calculationData))) } },
                    { lable: "Save and clear form", onConfirm: () => { dispatch(createPost(infoData.tempID, Object.assign(infoData, calculationData))); setInfoData(formInfoState); } }
                ]
            })
        }
    }

    console.log(infoData)
    console.log(calculationData)



    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Grid container sx={{ mt: 2, paddingRight: "16px", margin: "10px 0 0 0px" }} spacing={1.5}>
                    <InformationForm infoData={infoData} setInfoData={setInfoData} tempID="PIP-0001" />
                    <Header size={12} variant="h4" sum={sums[0][2] > 0 && sums[0][2].toFixed(2) + " kg CO2 eq"}>Material:</Header>
                    <Input label="Weight" unit="kg" name='weight' type='number' value={calculationData.weight.value} fileValue={calculationData.weight.file} handleChange={handleChangeNumber} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <CofDesInput options={materialEFOptions} handleSelection={handleSelection} label="Material EF" unit="kg CO2 eq/kg metal" name='materialEF' type='number' name2='electricityInputEF' value2={calculationData.materialEF.value2} value={calculationData.materialEF.value} description={calculationData.materialEF.description} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} />
                    <CofDesInput options={electricityEFOptions} handleSelection={handleSelection} label="Electricity EF" unit="kg CO2 eq/kWh" name='electricityEF' type='number' value={calculationData.electricityEF.value} description={calculationData.electricityEF.description} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} />
                    <Header size={12} variant="h4">Transport</Header>
                    <CofDesFileInput options={transportEFOptions.land} handleSelection={handleSelection} header="Land" label="Distance" name="land" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.land.value} coefficinetValue={calculationData.land.coefficinet.value} description={calculationData.land.coefficinet.description} fileValue={calculationData.land.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[1][2]} />
                    <CofDesFileInput options={transportEFOptions.land} handleSelection={handleSelection} header="Land2" label="Distance" name="land2" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.land2.value} coefficinetValue={calculationData.land2.coefficinet.value} description={calculationData.land2.coefficinet.description} fileValue={calculationData.land2.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[2][2]} />
                    <CofDesFileInput options={transportEFOptions.water} handleSelection={handleSelection} header="Water" label="Distance" name="water" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.water.value} coefficinetValue={calculationData.water.coefficinet.value} description={calculationData.water.coefficinet.description} fileValue={calculationData.water.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[3][2]} />
                    <CofDesFileInput options={transportEFOptions.air} handleSelection={handleSelection} header="Air" label="Distance" name="air" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.air.value} coefficinetValue={calculationData.air.coefficinet.value} description={calculationData.air.coefficinet.description} fileValue={calculationData.air.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[4][2]} />
                    <Header size={12} variant="h4">Mechanical process</Header>
                    <CofDesFileInput options={electricityEFOptions} handleSelection={handleSelection} label="Electricity EF" unit1="km" unit2="kg CO2 eq/kWh" name='processElectricityEF' type='number' coefficinetValue={calculationData.processElectricityEF.value} description={calculationData.processElectricityEF.description} fileValue={calculationData.processElectricityEF.file} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <TimeElecInput header="Cutting" label1="Time" label2="Electricity" name="cutting" unit1="min" unit2="kWh/min" type="number" value={calculationData.cutting.time} coefficinetValue={calculationData.cutting.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[5][2]} />
                    <TimeElecInput header="Bending" label1="Time" label2="Electricity" name="bending" unit1="min" unit2="kWh/min" type="number" value={calculationData.bending.time} coefficinetValue={calculationData.bending.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[6][2]} />
                    <TimeElecInput header="Welding" label1="Time" label2="Electricity" name="welding" unit1="min" unit2="kWh/min" type="number" value={calculationData.welding.time} coefficinetValue={calculationData.welding.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[7][2]} />
                    <TimeElecInput header="Pressure test" label1="Time" label2="Electricity" name="pressureTest" unit1="min" unit2="kWh/min" type="number" value={calculationData.pressureTest.time} coefficinetValue={calculationData.pressureTest.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[8][2]} />
                    <TimeElecInput header="Drilliing" label1="Time" label2="Electricity" name="drilling" unit1="min" unit2="kWh/min" type="number" value={calculationData.drilling.time} coefficinetValue={calculationData.drilling.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[9][2]} />
                    <Header size={12} variant="h4">Other inputs</Header>
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Tap water" label="Value" name="tapWater" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.tapWater.value} coefficinetValue={calculationData.tapWater.coefficinet.value} description={calculationData.tapWater.coefficinet.description} fileValue={calculationData.tapWater.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[10][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Lubricating oil" label="Value" name="lubricatingOil" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.lubricatingOil.value} coefficinetValue={calculationData.lubricatingOil.coefficinet.value} description={calculationData.lubricatingOil.coefficinet.description} fileValue={calculationData.lubricatingOil.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[11][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Cutting fluid" label="Value" name="cuttingFluid" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.cuttingFluid.value} coefficinetValue={calculationData.cuttingFluid.coefficinet.value} description={calculationData.cuttingFluid.coefficinet.description} fileValue={calculationData.cuttingFluid.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[12][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Cardboard pacakging" label="Value" name="cardboardPacakging" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.cardboardPacakging.value} coefficinetValue={calculationData.cardboardPacakging.coefficinet.value} description={calculationData.cardboardPacakging.coefficinet.description} fileValue={calculationData.cardboardPacakging.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[13][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Plastic film packaging" label="Value" name="plasticFilmPackaging" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.plasticFilmPackaging.value} coefficinetValue={calculationData.plasticFilmPackaging.coefficinet.value} description={calculationData.plasticFilmPackaging.coefficinet.description} fileValue={calculationData.plasticFilmPackaging.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[14][2]} />
                    <Header size={12} variant="h4">Output</Header>
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Product" label="Value" name="outputProduct" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.outputProduct.value} coefficinetValue={calculationData.outputProduct.coefficinet.value} description={calculationData.outputProduct.coefficinet.description} fileValue={calculationData.outputProduct.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[15][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Lubricating oil waste" label="Value" name="lubricatingOilWaste" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.lubricatingOilWaste.value} coefficinetValue={calculationData.lubricatingOilWaste.coefficinet.value} description={calculationData.lubricatingOilWaste.coefficinet.description} fileValue={calculationData.lubricatingOilWaste.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[16][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Cutting fluid waste" label="Value" name="cuttingFluidWaste" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.cuttingFluidWaste.value} coefficinetValue={calculationData.cuttingFluidWaste.coefficinet.value} description={calculationData.cuttingFluidWaste.coefficinet.description} fileValue={calculationData.cuttingFluidWaste.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[17][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Wastewater" label="Value" name="wastewater" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.wastewater.value} coefficinetValue={calculationData.wastewater.coefficinet.value} description={calculationData.wastewater.coefficinet.description} fileValue={calculationData.wastewater.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[18][2]} />
                    <CofDesFileInput options={efOfOtherProcess} handleSelection={handleSelection} header="Metal scrap" label="Value" name="metalScrap" unit1="kg" unit2="kg CO2 eq/kg" type="number" value={calculationData.metalScrap.value} coefficinetValue={calculationData.metalScrap.coefficinet.value} description={calculationData.metalScrap.coefficinet.description} fileValue={calculationData.metalScrap.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[19][2]} />
                    <Grid item xs={12} mt={4}>
                        <Typography variant='h3'>Total sum is: {totalSum} kg CO2 eq</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: "20px" }}>
                        {loading ? <Button variant="contained" type='submit' fullWidth size='large' startIcon={<CircularProgress size="1rem" style={{ marginRight: "10px" }} />} disabled>{param.id ? "Update" : "Submit"}</Button>
                            : <Button variant="contained" type='submit' fullWidth size='large'>{param.id ? "Update" : "Submit"}</Button>}
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default PipeManufacturingForm