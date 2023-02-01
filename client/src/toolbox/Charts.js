import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material";
import Chart from 'react-google-charts';
import useSum from '../hooks/useSum';

const PieChart = ({ post }) => {
    const options = {
        sankey: {
            node: {
                label: {
                    padding: "30px",
                    fontName: 'Times-Roman',
                    fontSize: 14,
                    color: '#871b47',
                    bold: true,
                    italic: true
                },
                interactivity: true, // Allows you to select nodes.
                labelPadding: 10,     // Horizontal distance between the label and the node.
                nodePadding: 10,
            }
        }
    };
    const options2 = {
        title: "GHG breakdown",
        legend: { position: "bottom" }
    };
    const { chartCategorySums, chartSums } = useSum(post);

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

    const pieData = [["Sourece", "Emission"]].concat(chartCategorySums)

    const sankeyData = [
        ["From", "To", "Weight"],
    ]

    const handleSankeyData = (sankeyData) => {
        //lisätään pääkategoriat
        for (let i = 1; i < chartCategorySums.length + 1; i++) {
            sankeyData[i] = ["CO2 emission"].concat(chartCategorySums[i - 1])
            //console.log(sankeyData[i])
        }
        //lisätään pääketogian alacategoriat
        for (let i = chartCategorySums.length + 1; i < (chartCategorySums.length + 1 + chartSums.length); i++) {
            sankeyData.push(chartSums[i - chartCategorySums.length - 1])
            //console.log(sankeyData[i])
        }
    }

    const sum = pieData.map(d => typeof d[1] === "number" ? d[1] : null).reduce(function (x, y) {
        return x + y;
    })

    useEffect(() => {
        handleSankeyData(sankeyData)
    }, [])
    console.log(sum)
    return (
        <>{sum > 0 &&
            <Grid container direction="column">
                <Grid item>
                    <Chart chartType='PieChart' data={pieData} options={options2} width="100%" height="400px" />
                </Grid>
                <Grid item style={{ marginBottom: "10px" }}>
                    <Chart chartType='Sankey' width="100%" height="600px" data={sankeyData} options={options} />
                </Grid>
            </Grid>
        }
        </>
    )
}

export default PieChart