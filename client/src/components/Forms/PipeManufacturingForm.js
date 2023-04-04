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
    materialEF: { value: 0, value2: 0, description: "" },
    electricityEF: { value: 0, description: "" },
    lorry: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    sea: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    processElectricityEF: { value: 0, description: "", file: ""},
    cutting: { time: 0, electricity: 0},
    bending: { time: 0, electricity: 0},
    welding: { time: 0, electricity: 0},
    pressureTest: { time: 0, electricity: 0},
    drilling: { time: 0, electricity: 0},
}

const materialEFOptions = [
    { id: 0, label: "Material type", value: 0, value2: 0 },
    { id: 1, label: "steel production, converter, low-alloyed | steel, low-alloyed | Cutoff, U", value: 2.03478, value2: 0.0242 },
    { id: 2, label: "steel production, converter, unalloyed | steel, unalloyed | Cutoff, U", value: 1.61835 , value2: 0.0242 },
    { id: 3, label: "steel production, electric, chromium steel 18/8 | steel, chromium steel 18/8 | Cutoff, U", value: 4.30564, value2: 0.6250 },
    { id: 4, label: "steel production, electric, low-alloyed | steel, low-alloyed | Cutoff, U", value: 0.32791, value2: 0.54972},
    { id: 5, label: "cast iron production | cast iron | Cutoff, U", value: 1.34687, value2: 0.42361  },
    { id: 6, label: "Ductile iron production", value: 1.63668, value2: 0.42361 },
]

const electricityEFOptions = [
    { id: 0, label: "Countries", value: 0 },
    { id: 1, label: "Germany", value: 0.555 },
    { id: 2, label: "Italy", value: 0.394 },
    { id: 3, label: "Poland", value: 0.991 },
    { id: 4, label: "SE", value: 0.044 },
    { id: 5, label: "NL", value: 0.582 },
    { id: 6, label: "FI", value: 0.255 },
    { id: 7, label: "FI-Vaasan sahko", value: 0.148 },
]

const transportEFOptions = [
    { id: 0, label: "Transport type", value: 0 },
    { id: 1, label: "market for transport, freight, lorry 16-32 metric ton, EURO5 | transport, freight, lorry 16-32 metric ton, EURO5 | Cutoff, U", value: 0.1646 },
    { id: 2, label: "market for transport, freight, sea, container ship | transport, freight, sea, container ship | Cutoff, U", value: 0.0094 },
    { id: 3, label: "market for transport, freight train | transport, freight train | Cutoff, U", value: 0.0451 },
]

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
        console.log(name)
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], file: "" } })
    }, [calculationData]);

    const handleSelection = useCallback((e, options) => {
        let { name, value } = e.target;
        const chosen = options.find(({id}) => id === value)
        console.log(chosen.value)
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
                    <CofDesFileInput options={transportEFOptions} handleSelection={handleSelection} header="Lorry" label="Distance" name="lorry" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.lorry.value} coefficinetValue={calculationData.lorry.coefficinet.value} description={calculationData.lorry.coefficinet.description} fileValue={calculationData.lorry.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[1][2]} />
                    <CofDesFileInput options={transportEFOptions} handleSelection={handleSelection} header="Sea" label="Distance" name="sea" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.sea.value} coefficinetValue={calculationData.sea.coefficinet.value} description={calculationData.sea.coefficinet.description} fileValue={calculationData.sea.file} handleValue={handleCoeffinetChangeValue} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[2][2]} />
                    <Header size={12} variant="h4">Mechanical process</Header>
                    <CofDesFileInput options={electricityEFOptions} handleSelection={handleSelection} label="Electricity EF" unit1="km" unit2="kg CO2 eq/kWh" name='processElectricityEF' type='number' coefficinetValue={calculationData.processElectricityEF.value} description={calculationData.processElectricityEF.description} fileValue={calculationData.processElectricityEF.file} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <TimeElecInput header="Cutting" label1="Time" label2="Electricity" name="cutting" unit1="min" unit2="kWh/min" type="number" value={calculationData.cutting.time} coefficinetValue={calculationData.cutting.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[3][2]} />
                    <TimeElecInput header="Bending" label1="Time" label2="Electricity" name="bending" unit1="min" unit2="kWh/min" type="number" value={calculationData.bending.time} coefficinetValue={calculationData.bending.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[4][2]} />
                    <TimeElecInput header="Welding" label1="Time" label2="Electricity" name="welding" unit1="min" unit2="kWh/min" type="number" value={calculationData.welding.time} coefficinetValue={calculationData.welding.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[5][2]} />
                    <TimeElecInput header="Pressure test" label1="Time" label2="Electricity" name="pressureTest" unit1="min" unit2="kWh/min" type="number" value={calculationData.pressureTest.time} coefficinetValue={calculationData.pressureTest.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[6][2]} />
                    <TimeElecInput header="Drilliing" label1="Time" label2="Electricity" name="drilling" unit1="min" unit2="kWh/min" type="number" value={calculationData.drilling.time} coefficinetValue={calculationData.drilling.electricity} handleChange={handleChangeTime} handleCoeffinetChange={handleChangeElectricity} sum={sums[7][2]} />
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