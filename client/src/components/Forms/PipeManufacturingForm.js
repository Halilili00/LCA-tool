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
    materialEF: { value: 0, description: "" },
    electricityInputEF: { value: 0, description: "" },
    electricityEF: { value: 0, description: "" },
    lorry: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    sea: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    cutting: { value: { time: 0, electricity: 0 }, coefficinet: { value: 0, description: "" }, file: "" },
    bending: { value: { time: 0, electricity: 0 }, coefficinet: { value: 0, description: "" }, file: "" },
    welding: { value: { time: 0, electricity: 0 }, coefficinet: { value: 0, description: "" }, file: "" },
    pressureTest: { value: { time: 0, electricity: 0 }, coefficinet: { value: 0, description: "" }, file: "" },
    drilling: { value: { time: 0, electricity: 0 }, coefficinet: { value: 0, description: "" }, file: "" },
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
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: { time: parseFloat(value, 10), electricity: calculationData[name].value.electricity } } })
    }, [calculationData])

    const handleChangeElectricity = useCallback((e) => {
        let { name, value } = e.target;
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: { electricity: parseFloat(value, 10), time: calculationData[name].value.time } } })
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
        console.log(name)
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], file: "" } })
    }, [calculationData]);


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
                    <Header size={12} variant="h4" sum={sums[0][2]>0 && sums[0][2].toFixed(2) + " kg CO2 eq"}>Material:</Header>
                    <Input label="Weight" unit="kg" name='weight' type='number' value={calculationData.weight.value} fileValue={calculationData.weight.file} handleChange={handleChangeNumber} handleFile={handleFile} handleDeleteFile={handleDeleteFile}/>
                    <CofDesInput label="Material EF" unit="kg CO2 eq/kg metal" name='materialEF' type='number' value={calculationData.materialEF.value} description={calculationData.materialEF.description} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} />
                    <CofDesInput label="Electricity input EF" unit="kWh/kg metal" name='electricityInputEF' type='number' value={calculationData.electricityInputEF.value} description={calculationData.electricityInputEF.description} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} />
                    <CofDesInput label="Electricity EF" unit="kg CO2 eq/kWh" name='electricityEF' type='number' value={calculationData.electricityEF.value} description={calculationData.electricityEF.description} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} />
                    <Header size={12} variant="h4">Transport</Header>
                    <CofDesFileInput header="Lorry" label="Distance" name="lorry" unit="km" type="number" value={calculationData.lorry.value} coefficinetValue={calculationData.lorry.coefficinet.value} description={calculationData.lorry.coefficinet.description} fileValue={calculationData.lorry.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[1][2]}/>
                    <CofDesFileInput header="Sea" label="Distance" name="sea" unit="km" type="number" value={calculationData.sea.value} coefficinetValue={calculationData.sea.coefficinet.value} description={calculationData.sea.coefficinet.description} fileValue={calculationData.sea.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[2][2]}/>
                    <Header size={12} variant="h4">Mechanical process</Header>
                    <TimeElecInput header="Cutting" label="Time" name="cutting" unit="min" type="number" time={calculationData.cutting.value.time} electricity={calculationData.cutting.value.electricity} coefficinetValue={calculationData.cutting.coefficinet.value} description={calculationData.cutting.coefficinet.description} fileValue={calculationData.cutting.file} handleTime={handleChangeTime} handleElectricity={handleChangeElectricity} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[3][2]}/>
                    <TimeElecInput header="Bending" label="Time" name="bending" unit="min" type="number" time={calculationData.bending.value.time} electricity={calculationData.bending.value.electricity} coefficinetValue={calculationData.bending.coefficinet.value} description={calculationData.bending.coefficinet.description} fileValue={calculationData.bending.file} handleTime={handleChangeTime} handleElectricity={handleChangeElectricity} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[4][2]}/>
                    <TimeElecInput header="Welding" label="Time" name="welding" unit="min" type="number" time={calculationData.welding.value.time} electricity={calculationData.welding.value.electricity} coefficinetValue={calculationData.welding.coefficinet.value} description={calculationData.welding.coefficinet.description} fileValue={calculationData.welding.file} handleTime={handleChangeTime} handleElectricity={handleChangeElectricity} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[5][2]}/>
                    <TimeElecInput header="Pressure test" label="Time" name="pressureTest" unit="min" type="number" time={calculationData.pressureTest.value.time} electricity={calculationData.pressureTest.value.electricity} coefficinetValue={calculationData.pressureTest.coefficinet.value} description={calculationData.pressureTest.coefficinet.description} fileValue={calculationData.pressureTest.file} handleTime={handleChangeTime} handleElectricity={handleChangeElectricity} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[6][2]}/>
                    <TimeElecInput header="Drilliing" label="Time" name="drilling" unit="min" type="number" time={calculationData.drilling.value.time} electricity={calculationData.drilling.value.electricity} coefficinetValue={calculationData.drilling.coefficinet.value} description={calculationData.drilling.coefficinet.description} fileValue={calculationData.drilling.file} handleTime={handleChangeTime} handleElectricity={handleChangeElectricity} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[7][2]}/>
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