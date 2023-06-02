
const useCalculateSum = () => {

    const calculateSum = (post) => {
        console.log(post)
        return [
            ["Steel", "Steel removed", post?.steelRemoved.value * post?.materialEF.value],
            ["Steel", "Part weight", (post?.steel.value - post?.steelRemoved.value) * post?.materialEF.value],
            ["Operations", "Machining time", post?.energyConsumption.value * post?.machiningTime.value * post?.machiningTime.coefficinet],
            ["Operations", "Machining liquid consumption", (post?.machiningLiquidConsumption.value / post?.annualProduction.value) * post?.machiningLiquidConsumption.coefficinet],
            ["Operations", "Hydraulic oil consumption", ((post?.hydraulicOilConsumption.value / post?.annualProduction.value) * post?.hydraulicOilConsumption.coefficinet)],
            ["Operations", "Packaging plastic", post?.packagingPlastic.value * post?.packagingPlastic.coefficinet],
            ["Site heating", "Oil", (post?.oil.value / post?.annualProduction.value) * post?.oil.coefficinet],
            ["Site heating", "Electricity", ((post?.electrycity.value / post?.annualProduction.value) * ((typeof post?.electrycity?.coefficinet.value !== 'undefined') ? post?.electrycity?.coefficinet.value : post?.electrycity?.coefficinet))],
            ["Transportation", "Track", ((40 / 100) * post?.euro5?.value * post?.trackCof?.value * (post?.steel.value / 2000)) + ((40 / 100) * post?.euro6?.value * post?.trackCof?.value * (post?.steel.value / 2000)) + ((40 / 100) * post?.euro7?.value * post?.trackCof?.value * (post?.steel.value / 2000))],
            ["Transportation", "Ship", (4000 / 100) * post?.roro?.value * post?.shipCof?.value * (post?.steel.value / 2000000)]
        ].map(d => typeof d[2] === "number" ? d[2] : null).reduce(function (x, y) {
            return x + y;
        }).toFixed(2)
    }

    const calculatePipeSum = (post) => {
        console.log(post)
        return [
            ["Material", "Materiali", (post?.weight.value * post?.materialEF.value) + (post?.materialEF.value2 * post?.weight.value * post?.electricityEF.value)],
            ["Transport", "Land", post?.land.coefficinet.value * (post?.weight.value / 1000) * post?.land.value],
            ["Transport", "Land2", post?.land2.coefficinet.value * (post?.weight.value / 1000) * post?.land2.value],
            ["Transport", "Water", post?.water.coefficinet.value * (post?.weight.value / 1000) * post?.water.value],
            ["Transport", "Air", post?.air.coefficinet.value * (post?.weight.value / 1000) * post?.air.value],
            ["Mechanical process", "Cutting", (post?.cutting.time * post?.cutting.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Bending", (post?.bending.time * post?.bending.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Welding", (post?.welding.time * post?.welding.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Pressure test", (post?.pressureTest.time * post?.pressureTest.electricity) * post?.processElectricityEF.value],
            ["Mechanical process", "Drilliing", (post?.drilling.time * post?.drilling.electricity) * post?.processElectricityEF.value],
            ["Other input", "Tap water", post?.tapWater.value * post?.tapWater.coefficinet.value],
            ["Other input", "Lubricating oil", post?.lubricatingOil.value * post?.lubricatingOil.coefficinet.value],
            ["Other input", "Cutting fluid", post?.cuttingFluid.value * post?.cuttingFluid.coefficinet.value],
            ["Other input", "Cardboard pacakging", post?.cardboardPacakging.value * post?.cardboardPacakging.coefficinet.value],
            ["Other input", "Plastic film packaging", post?.plasticFilmPackaging.value * post?.plasticFilmPackaging.coefficinet.value],
            ["Output", "Product", post?.outputProduct.value * post?.outputProduct.coefficinet.value / 1000],
            ["Output", "Lubricating oil waste", post?.lubricatingOilWaste.value * post?.lubricatingOilWaste.coefficinet.value / 1000],
            ["Output", "Cutting fluid waste", post?.cuttingFluidWaste.value * post?.cuttingFluidWaste.coefficinet.value / 1000],
            ["Output", "Wastewater", post?.wastewater.value * post?.wastewater.coefficinet.value / 1000],
            ["Output", "Metal scrap", post?.metalScrap.value * post?.metalScrap.coefficinet.value / 1000],
        ].map(d => typeof d[2] === "number" ? d[2] : null).reduce(function (x, y) {
            return x + y;
        }).toFixed(2)
    }

    console.log("calculateSum")
    return { calculateSum, calculatePipeSum }
}

export default useCalculateSum