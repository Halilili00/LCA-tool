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
            setInfoData(Object.assign({}, ...Object.keys(infoData).map(key => ({ [key]: { ...postToUpdate, validDate: { start: postToUpdate.validDate.start.slice(0, 10), end: postToUpdate.validDate.end.slice(0, 10) } }[key] }))))
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (param.id) {
            handleOpenDialog({
                title: "You want to update data?",
                succes: "Data is updated",
                buttons: [
                    { lable: "Update and go Calculations", navigatePage: "/LCADatas", onConfirm: () => { dispatch(updatePost(postToUpdate.tempID, param.id, Object.assign({},postToUpdate ,Object.assign(infoData, calculationData)))) } },
                    { lable: "Update and stay in form", onConfirm: () => { dispatch(updatePost(postToUpdate.tempID, param.id, Object.assign({},postToUpdate ,Object.assign(infoData, calculationData)))) } }
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

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Grid container sx={{ mt: 2, paddingRight: "16px", margin: "10px 0 0 0px" }} spacing={1.5}>
                    <InformationForm infoData={infoData} setInfoData={setInfoData} tempID="MAC-0001" />
                    <Input label="Annual Production" unit="pcs/year" name='annualProduction' type='number' value={calculationData.annualProduction.value} fileValue={calculationData.annualProduction.file} handleChange={handleChangeNumber} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <Header size={12} variant="h4">Row material:</Header>
                    <Input label="Steel" name='steel' unit="kg/pcs" type='number' value={calculationData.steel.value} handleChange={handleChangeNumber} fileValue={calculationData.steel.file} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <Input label="Removed steel" name='steelRemoved' unit="kg/pcs" type='number' value={calculationData.steelRemoved.value} coefficinetValue={calculationData.steelRemoved.coefficinet} fileValue={calculationData.steelRemoved.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[0][2]} />
                    <Input label="Part weight" name="partWeight" type='number' unit="kg/pcs" readOnly value={calculationData.steel.value - calculationData.steelRemoved.value} coefficinetValue={calculationData.partWeight.coefficinet} fileValue={calculationData.partWeight.file} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[1][2]} />
                    <Header size={12} variant="h4">Operations:</Header>
                    <Input label="Energy consumption" name='energyConsumption' unit="kW" type='number' value={calculationData.energyConsumption.value} fileValue={calculationData.energyConsumption.file} handleChange={handleChangeNumber} handleFile={handleFile} handleDeleteFile={handleDeleteFile} />
                    <Input label="Machining time" name='machiningTime' unit="h" type='number' value={calculationData.machiningTime.value} coefficinetValue={calculationData.machiningTime.coefficinet} fileValue={calculationData.machiningTime.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[2][2]} />
                    <Input label="Machining liquid consumption" name='machiningLiquidConsumption' unit="l/year" type='number' value={calculationData.machiningLiquidConsumption.value} coefficinetValue={calculationData.machiningLiquidConsumption.coefficinet} fileValue={calculationData.machiningLiquidConsumption.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[3][2]} />
                    <Input label="Hydraulic oil consumption" name='hydraulicOilConsumption' unit="l/year" type='number' value={calculationData.hydraulicOilConsumption.value} coefficinetValue={calculationData.hydraulicOilConsumption.coefficinet} fileValue={calculationData.hydraulicOilConsumption.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[4][2]} />
                    <Input label="Packaging plastic" name='packagingPlastic' unit="kg/pcs" type='number' value={calculationData.packagingPlastic.value} coefficinetValue={calculationData.packagingPlastic.coefficinet} fileValue={calculationData.packagingPlastic.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[5][2]} />
                    <Header size={12} variant="h4">Site heating</Header>
                    <Input label="Oil" name='oil' unit="l/year" type='number' value={calculationData.oil.value} coefficinetValue={calculationData.oil.coefficinet} fileValue={calculationData.oil.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[6][2]} />
                    <Input label="Electrycity" name='electrycity' unit="kWh" type='number' value={calculationData.electrycity.value} coefficinetValue={calculationData.electrycity.coefficinet} fileValue={calculationData.electrycity.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={sums[7][2]} />
                    <Header size={12} variant="h4">Transportation: Route</Header>
                    <Header size={12} variant="h4">Track:</Header>
                    <Input label="EURO5" name="euro5" unit="km" type="number" value={calculationData.euro5.value} coefficinetValue={calculationData.euro5.coefficinet} fileValue={calculationData.euro5.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={(40 / 100) * calculationData.euro5.value * calculationData.euro5.coefficinet * (calculationData.steel.value / 2000)} />
                    <Input label="EURO6" name="euro6" unit="km" type="number" value={calculationData.euro6.value} coefficinetValue={calculationData.euro6.coefficinet} fileValue={calculationData.euro6.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={(40 / 100) * calculationData.euro6.value * calculationData.euro6.coefficinet * (calculationData.steel.value / 2000)} />
                    <Input label="EURO7" name="euro7" unit="km" type="number" value={calculationData.euro7.value} coefficinetValue={calculationData.euro7.coefficinet} fileValue={calculationData.euro7.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={(40 / 100) * calculationData.euro7.value * calculationData.euro7.coefficinet * (calculationData.steel.value / 2000)} />
                    <Header size={12} variant="h4">Ship:</Header>
                    <Input label="RO-RO" name="roro" unit="km" type="number" value={calculationData.roro.value} coefficinetValue={calculationData.roro.coefficinet} fileValue={calculationData.roro.file} handleChange={handleChangeNumber} handleCoeffinetChange={handleCoeffinetChange} handleFile={handleFile} handleDeleteFile={handleDeleteFile} sum={(4000 / 100) * calculationData.roro.value * calculationData.roro.coefficinet * (calculationData.steel.value / 2000000)} />
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