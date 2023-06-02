import React from 'react'

const usePipeSum = (post) => {
    const sums = [
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
    ]

    const fixedSums = sums.map(s => typeof s[2] === "number" ? [s[0], s[1], Number(s[2].toFixed(2))] : s).sort(function (x, y) {
        return y[2] - x[2];
    })

    const categorySum = [
        ["Material", Number(((post?.weight.value * post?.materialEF.value) + (post?.materialEF.value2 * post?.weight.value * post?.electricityEF.value)).toFixed(2))],
        ["Transport", Number(((post?.land.coefficinet.value * (post?.weight.value / 1000) * post?.land.value) 
        + (post?.land2.coefficinet.value * (post?.weight.value / 1000) * post?.land2.value) 
        + (post?.water.coefficinet.value * (post?.weight.value / 1000) * post?.water.value)
        + (post?.air.coefficinet.value * (post?.weight.value / 1000) * post?.air.value)).toFixed(2))],
        ["Mechanical process", Number((((post?.cutting.time * post?.cutting.electricity) * post?.processElectricityEF.value)
            + ((post?.bending.time * post?.bending.electricity) * post?.processElectricityEF.value)
            + ((post?.welding.time * post?.welding.electricity) * post?.processElectricityEF.value)
            + ((post?.pressureTest.time * post?.pressureTest.electricity) * post?.processElectricityEF.value)
            + ((post?.drilling.time * post?.drilling.electricity) * post?.processElectricityEF.value)).toFixed(2))],
        ["Other input", Number(((post?.tapWater.value * post?.tapWater.coefficinet.value)
            + (post?.lubricatingOil.value * post?.lubricatingOil.coefficinet.value)
            + (post?.cuttingFluid.value * post?.cuttingFluid.coefficinet.value)
            + (post?.cardboardPacakging.value * post?.cardboardPacakging.coefficinet.value)
            + (post?.plasticFilmPackaging.value * post?.plasticFilmPackaging.coefficinet.value)).toFixed(2))],
        ["Output", Number(((post?.outputProduct.value * post?.outputProduct.coefficinet.value / 1000)
            + (post?.lubricatingOilWaste.value * post?.lubricatingOilWaste.coefficinet.value / 1000)
            + (post?.cuttingFluidWaste.value * post?.cuttingFluidWaste.coefficinet.value / 1000)
            + (post?.wastewater.value * post?.wastewater.coefficinet.value / 1000)
            + (post?.metalScrap.value * post?.metalScrap.coefficinet.value / 1000)).toFixed(2))],
    ]

    const chartCategorySums = categorySum.filter(cs => cs[1] > 0).sort(function (x, y) {
        return y[2] - x[2];
    })

    const chartSums = fixedSums.filter(fs => fs[2] > 0)

    const totalSum = sums.map(d => typeof d[2] === "number" ? d[2] : null).reduce(function (x, y) {
        return x + y;
    }).toFixed(2)

    console.log((post?.weight.value * post?.materialEF.value))
    return {
        chartCategorySums, chartSums, totalSum, sums
    }
}

export default usePipeSum