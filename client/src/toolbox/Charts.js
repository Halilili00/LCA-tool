import React, { useEffect, useState } from 'react'
import { Grid, Typography } from "@mui/material";
import Chart from 'react-google-charts';
import useSum from '../hooks/useSum';

const PieChart = ({ post, myComponentHeight, chartCategorySums, chartSums }) => {
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
        legend: { position: "bottom" }
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

    const pieData = [["Sourece", "Emission"]].concat(chartCategorySums)

    const sankeyData = [
        ["From", "To", "Weight"],
    ]

    const handleSankeyData = (sankeyData) => {
        //lisätään pääkategoriat
        for (let i = 1; i < chartCategorySums.length + 1; i++) {
            sankeyData[i] = ["CO2 emission"].concat(chartCategorySums[i - 1])
            console.log(sankeyData[i])
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
        //console.log("happen")
    }, [myComponentHeight])

    console.log(chartCategorySums)
    return (
        <>{sum > 0 && <Grid container direction="column" style={{ pageBreakBefore: myComponentHeight>2846 ? 'auto' : 'always' }}>
                <Grid item style={{ marginTop: "20px" }}>
                    <Typography variant='h4' color="black">GHG breakdown</Typography>
                </Grid>
                <Grid item>
                    <Chart chartType='PieChart' width="100%" height="400px" data={pieData} options={options2} />
                </Grid>
                <Grid item style={{ margin: "20px" }}>
                    <Chart chartType='Sankey' width="100%" height="650px" data={sankeyData} options={options} suppressWarning={false}/>
                </Grid>
            </Grid>
        }
        </>
    )
}

export default PieChart