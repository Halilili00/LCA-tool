import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';

const PieChart = ({ post }) => {
    const options2 = {
        title: "GHG breakdown",
        legend: {position: "bottom"}
    };
    /*const picked = (({annualProduction, energyConsumption, hydraulicOilConsumption}) => ({
        annualProduction, energyConsumption, hydraulicOilConsumption}))(post);
    const entires = Object.entries(picked)
    const [data,setData] = useState([["Pizza", "Popularity"],["Pepperoni", 33]]);

    useEffect(()=>{
        setData([...data, ...(entires.map(e=> [e[0],e[1].value]))])
        //entires.map(e=> setData([...data, [e[0],e[1].value]]))
        console.log(entires)
    },[])
    console.log(data)*/

    const data = [
        ["Source", "Emission"],
        ["Steel", ((post.steelRemoved.value * post.steelRemoved.coefficinet) + ((post.steel.value - post.steelRemoved.value) * post.partWeight.coefficinet))],
        ["Operations", ((post.energyConsumption.value * post.machiningTime.value * post.machiningTime.coefficinet) + ((post.machiningLiquidConsumption.value / post.annualProduction.value) * post.machiningLiquidConsumption.coefficinet) + ((post.hydraulicOilConsumption.value / post.annualProduction.value) * post.hydraulicOilConsumption.coefficinet) + (post.packagingPlastic.value * post.packagingPlastic.coefficinet))],
        ["Site heating", (((post.oil.value / post.annualProduction.value) * post.oil.coefficinet) + ((post.electrycity.value / post.annualProduction.value) * post.electrycity.coefficinet))],
        ["Transportation", (((40 / 100) * post.euro5?.value * post.euro5?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro6?.value * post.euro6?.coefficinet * (post.steel.value / 2000)) + ((40 / 100) * post.euro7?.value * post.euro7?.coefficinet * (post.steel.value / 2000)) + ((4000 / 100) * post.roro?.value * post.roro?.coefficinet * (post.steel.value / 2000000)))],
    ]
    console.log(data)
    return (
        <Chart chartType='PieChart' data={data} options={options2} width="100%" height="400px" />
    )
}

export default PieChart