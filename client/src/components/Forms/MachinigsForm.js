import React, { useCallback, useEffect, useState } from 'react'
import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import Input from '../../toolbox/Input';
import InformationForm from './InformationForm';
import Header from '../../toolbox/Header';
import useSum from '../../hooks/useSum';
import { useDialogAlert } from '../../hooks/useDialogAlert';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/postActions';
import { useParams } from 'react-router-dom';
import CofDesFileInput from '../../toolbox/CofDesFileInput';
import TimeElecInput from '../../toolbox/TimeElecInput';
import CofDesInput from '../../toolbox/CofDesInput';


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
    annualProduction: { value: 1, file: "" },
    materialEF: { value: 0, description: "", file: ""},
    steel: { value: 0, file: "" },
    steelRemoved: { value: 0, coefficinet: 0, file: "" },
    partWeight: { coefficinet: 0 },
    energyConsumption: { value: 0, file: "" },
    machiningTime: { value: 0, coefficinet: 0, file: "" },
    machiningLiquidConsumption: { value: 0, coefficinet: 0, file: "" },
    hydraulicOilConsumption: { value: 0, coefficinet: 0, file: "" },
    packagingPlastic: { value: 0, coefficinet: 0, file: "" },
    oil: { value: 0, coefficinet: 0, file: "" },
    electrycity: { value: 0, coefficinet: { value: 0, description: "" }, file: "" },
    trackCof: { value: 0, description: "", file: "" },
    shipCof: { value: 0, description: "", file: "" },
    euro5: { value: 0, coefficinet: 0, file: "" },
    euro6: { value: 0, coefficinet: 0, file: "" },
    euro7: { value: 0, coefficinet: 0, file: "" },
    roro: { value: 0, coefficinet: 0, file: "" }
}

const transportEFOptions = [
    { id: 0, label: "Transport type", value: 0 },
    { id: 1, label: "market for transport, freight, lorry 16-32 metric ton, EURO5 | transport, freight, lorry 16-32 metric ton, EURO5 | Cutoff, U", value: 0.1646 },
    { id: 2, label: "market for transport, freight, sea, container ship | transport, freight, sea, container ship | Cutoff, U", value: 0.0094 },
    { id: 3, label: "market for transport, freight train | transport, freight train | Cutoff, U", value: 0.0451 },
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

const materialEFOptions = [
    { id: 0, label: "Material type", value: 0, value2: 0 },
    { id: 1, label: "steel production, converter, low-alloyed | steel, low-alloyed | Cutoff, U", value: 2.03478, value2: 0.0242 },
    { id: 2, label: "steel production, converter, unalloyed | steel, unalloyed | Cutoff, U", value: 1.61835 , value2: 0.0242 },
    { id: 3, label: "steel production, electric, chromium steel 18/8 | steel, chromium steel 18/8 | Cutoff, U", value: 4.30564, value2: 0.6250 },
    { id: 4, label: "steel production, electric, low-alloyed | steel, low-alloyed | Cutoff, U", value: 0.32791, value2: 0.54972},
    { id: 5, label: "cast iron production | cast iron | Cutoff, U", value: 1.34687, value2: 0.42361  },
    { id: 6, label: "Ductile iron production", value: 1.63668, value2: 0.42361 },
]

const MachiningsForm = () => {
    const [infoData, setInfoData] = useState(formInfoState);
    const [calculationData, setCalculationData] = useState(formCalculationState);
    const dispatch = useDispatch();
    const param = useParams();
    const { totalSum, sums } = useSum(calculationData);
    const { handleOpenDialog } = useDialogAlert();
    const { posts, loading, error } = useSelector((state) => state.postReducer);
    const postToUpdate = posts.find((post) => post._id === param.id);

    useEffect(() => {
        if (param.id && postToUpdate) {
            setInfoData(Object.assign({}, ...Object.keys(infoData).map(key => ({ [key]: { ...postToUpdate, validDate: { start: postToUpdate?.validDate?.start.slice(0, 10), end: postToUpdate?.validDate?.end.slice(0, 10) } }[key] }))))
            setCalculationData(Object.assign({}, ...Object.keys(calculationData).map(key => ({ [key]: postToUpdate[key] }))))
        }
    }, [param.id, postToUpdate])

    const handleChangeNumber = useCallback((e) => {
        let { name, value } = e.target;
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: parseFloat(value, 10) } })
    }, [calculationData])

    const handleCoeffinetChange = useCallback((e) => {
        let { name, value } = e.target;
        setCalculationData({ ...calculationData, [name]: { ...calculationData[name], coefficinet: parseFloat(value, 10) } })
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
        const chosen = options.find(({ id }) => id === value)
        console.log(chosen.value)
        if (calculationData[name].coefficinet) {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], coefficinet: { value: parseFloat(chosen.value, 10), description: calculationData[name].coefficinet.description } } })
        } else {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], value: parseFloat(chosen.value, 10), description: calculationData[name].description } })
        }
    }, [calculationData])

    const handleCoeffinetChangeValue = useCallback((e) => {
        let { name, value } = e.target;
        if (calculationData[name].coefficinet) {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], coefficinet: { value: parseFloat(value, 10), description: calculationData[name].coefficinet.description } } })
        } else {
            setCalculationData({ ...calculationData, [name]: { ...calculationData[name], coefficinet: parseFloat(value, 10), description: calculationData[name].description } })
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
                    { lable: "Save and clear form", onConfirm: () => { dispatch(createPost(infoData.tempID, Object.assign(infoData, calculationData))); setInfoData(formInfoState); setCalculationData(formCalculationState) } }
                ]
            })
        }
    }

    console.log(calculationData)

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Grid container sx={{ mt: 2, paddingRight: "16px", margin: "10px 0 0 0px" }} spacing={1.5}>
                    <InformationForm infoData={infoData} setInfoData={setInfoData} tempID="MAC-0001" />
                    <Input label="Annual Production" unit="pcs/year" name='annualProduction' type='number' value={calculationData.annualProduction.value} fileValue={calculationData.annualProduction.file} handleChange={handleChangeNumber} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <Header size={12} variant="h4">Row material:</Header>
                    <CofDesFileInput options={materialEFOptions} handleSelection={handleSelection} label="Material EF" unit2="kg CO2 eq/kg metal" name='materialEF' type='number' coefficinetValue={calculationData.materialEF.value} description={calculationData.materialEF.description} fileValue={calculationData.materialEF.file} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <TimeElecInput label1="Steel" label2="EF" name='steel' unit1="kg/pcs" type='number' value={calculationData.steel.value} coefficinetValue={calculationData.materialEF.value} handleChange={handleChangeNumber} />
                    <TimeElecInput label1="Removed steel" label2="EF" name='steelRemoved' unit1="kg/pcs" type='number' value={calculationData.steelRemoved.value} coefficinetValue={calculationData.materialEF.value} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} sum={sums[0][2]} />
                    <TimeElecInput label1="Part weight" label2="EF" name="partWeight" type='number' unit1="kg/pcs" readOnly value={calculationData.steel.value - calculationData.steelRemoved.value} coefficinetValue={calculationData.materialEF.value} handleCoeffinetChange={handleCoeffinetChange} sum={sums[1][2]} />
                    <Header size={12} variant="h4">Operations:</Header>
                    <Input label="Energy consumption" name='energyConsumption' unit="kW" type='number' value={calculationData.energyConsumption.value} fileValue={calculationData.energyConsumption.file} handleChange={handleChangeNumber} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <Input label="Machining time" name='machiningTime' unit="h" type='number' value={calculationData.machiningTime.value} coefficinetValue={calculationData.machiningTime.coefficinet} fileValue={calculationData.machiningTime.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[2][2]} />
                    <Input label="Machining liquid consumption" name='machiningLiquidConsumption' unit="l/year" type='number' value={calculationData.machiningLiquidConsumption.value} coefficinetValue={calculationData.machiningLiquidConsumption.coefficinet} fileValue={calculationData.machiningLiquidConsumption.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[3][2]} />
                    <Input label="Hydraulic oil consumption" name='hydraulicOilConsumption' unit="l/year" type='number' value={calculationData.hydraulicOilConsumption.value} coefficinetValue={calculationData.hydraulicOilConsumption.coefficinet} fileValue={calculationData.hydraulicOilConsumption.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[4][2]} />
                    <Input label="Packaging plastic" name='packagingPlastic' unit="kg/pcs" type='number' value={calculationData.packagingPlastic.value} coefficinetValue={calculationData.packagingPlastic.coefficinet} fileValue={calculationData.packagingPlastic.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[5][2]} />
                    <Header size={12} variant="h4">Site heating</Header>
                    <Input label="Oil" name='oil' unit="l/year" type='number' value={calculationData.oil.value} coefficinetValue={calculationData.oil.coefficinet} fileValue={calculationData.oil.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[6][2]} />
                    <CofDesFileInput options={electricityEFOptions} handleSelection={handleSelection} label="Electrycity" name='electrycity' unit1="kWh" unit2="kg CO2 eq/kWh" type="number" value={calculationData.electrycity.value} coefficinetValue={calculationData.electrycity.coefficinet.value} description={calculationData.electrycity.coefficinet.description} fileValue={calculationData.electrycity.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[7][2]} />
                    <Header size={12} variant="h4">Transportation: Route</Header>
                    <CofDesFileInput options={transportEFOptions} handleSelection={handleSelection} label="Track:" lableVariant={"h4"} unit1="km" unit2="kg CO2 eq/t-km" name='trackCof' type='number' coefficinetValue={calculationData.trackCof.value} description={calculationData.trackCof.description} fileValue={calculationData.trackCof.file} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <TimeElecInput label1="EURO5" label2= "EF" name="euro5" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.euro5.value} coefficinetValue={calculationData.trackCof.value} handleChange={handleChangeNumber} sum={(40 / 100) * calculationData.euro5.value * calculationData.trackCof.value * (calculationData.steel.value / 2000)} />
                    <TimeElecInput label1="EURO6" label2= "EF" name="euro6" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.euro6.value} coefficinetValue={calculationData.trackCof.value} handleChange={handleChangeNumber} sum={(40 / 100) * calculationData.euro6.value * calculationData.trackCof.value * (calculationData.steel.value / 2000)} />
                    <TimeElecInput label1="EURO7" label2= "EF" name="euro7" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.euro7.value} coefficinetValue={calculationData.trackCof.value} handleChange={handleChangeNumber} sum={(40 / 100) * calculationData.euro7.value * calculationData.trackCof.value * (calculationData.steel.value / 2000)} />
                    <CofDesFileInput options={transportEFOptions} handleSelection={handleSelection} label="Ship:" lableVariant={"h4"} unit1="km" unit2="kg CO2 eq/t-km" name='shipCof' type='number' coefficinetValue={calculationData.shipCof.value} description={calculationData.shipCof.description} fileValue={calculationData.shipCof.file} handleValue={handleCoeffinetChangeValue} handleDescription={handleCoeffinetChangeDescription} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <TimeElecInput label1="RO-RO" label2= "EF" name="roro" unit1="km" unit2="kg CO2 eq/t-km" type="number" value={calculationData.roro.value} coefficinetValue={calculationData.shipCof.value} handleChange={handleChangeNumber} sum={(4000 / 100) * calculationData.roro.value * calculationData.shipCof.value * (calculationData.steel.value / 2000000)} />
                    <Grid item xs={12} mt={4}>
                        <Typography variant='h3'>Total sum is: {totalSum} CO2 eqv GHG kg</Typography>
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

export default MachiningsForm