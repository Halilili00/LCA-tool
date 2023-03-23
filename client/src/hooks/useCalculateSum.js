
const useCalculateSum = () => {

    const calculateSum = (post) => {
        console.log(post)
        return [
            ["Steel", "Steel removed", post?.steelRemoved.value * post?.steelRemoved.coefficinet],
            ["Steel", "Part weight", (post?.steel.value - post?.steelRemoved.value) * post?.partWeight.coefficinet],
            ["Operations", "Machining time", post?.energyConsumption.value * post?.machiningTime.value * post?.machiningTime.coefficinet],
            ["Operations", "Machining liquid consumption", (post?.machiningLiquidConsumption.value / post?.annualProduction.value) * post?.machiningLiquidConsumption.coefficinet],
            ["Operations", "Hydraulic oil consumption", ((post?.hydraulicOilConsumption.value / post?.annualProduction.value) * post?.hydraulicOilConsumption.coefficinet)],
            ["Operations", "Packaging plastic", post?.packagingPlastic.value * post?.packagingPlastic.coefficinet],
            ["Site heating", "Oil", (post?.oil.value / post?.annualProduction.value) * post?.oil.coefficinet],
            ["Site heating", "Electricity", ((post?.electrycity.value / post?.annualProduction.value) * post?.electrycity.coefficinet)],
            ["Transportation", "Track", ((40 / 100) * post?.euro5?.value * post?.euro5?.coefficinet * (post?.steel.value / 2000)) + ((40 / 100) * post?.euro6?.value * post?.euro6?.coefficinet * (post?.steel.value / 2000)) + ((40 / 100) * post?.euro7?.value * post?.euro7?.coefficinet * (post?.steel.value / 2000))],
            ["Transportation", "Ship", (4000 / 100) * post?.roro?.value * post?.roro?.coefficinet * (post?.steel.value / 2000000)]
        ].map(d => typeof d[2] === "number" ? d[2] : null).reduce(function (x, y) {
            return x + y;
        }).toFixed(2)
    }

    const calculatePipeSum = (post) => {
        console.log(post)
        return [
            ["Material", "Materiali", (post?.weight.value * post?.materialEF.value) + (post?.materialEF.value2 * post?.weight.value * post?.electricityEF.value)],
            ["Transport", "Lorry", post?.lorry.coefficinet.value * (post?.weight.value / 1000) * post?.lorry.value],
            ["Transport", "Sea", post?.sea.coefficinet.value * (post?.weight.value / 1000) * post?.sea.value],
            ["Mechanical process", "Cutting", (post?.cutting.time * post?.cutting.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Bending", (post?.bending.time * post?.bending.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Welding", (post?.welding.time * post?.welding.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Pressure test", (post?.pressureTest.time * post?.pressureTest.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Drilliing", (post?.drilling.time * post?.drilling.electricity) * post?.processElectricityEF.value],
        ].map(d => typeof d[2] === "number" ? d[2] : null).reduce(function (x, y) {
            return x + y;
        }).toFixed(2)
    }

    console.log("calculateSum")
    return { calculateSum, calculatePipeSum }
}

export default useCalculateSum