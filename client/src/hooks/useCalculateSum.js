
const useCalculateSum = () => {

    const calculateSum = (post) => {
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

    console.log("calculateSum")
    return { calculateSum }
}

export default useCalculateSum