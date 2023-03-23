import React from 'react'

const usePipeSum = (post) => {
    const sums = [
        ["Material", "Materiali", (post?.weight.value * post?.materialEF.value) + (post?.materialEF.value2 * post?.weight.value * post?.electricityEF.value)],
        ["Transport", "Lorry", post?.lorry.coefficinet.value * (post?.weight.value / 1000) * post?.lorry.value],
        ["Transport", "Sea", post?.sea.coefficinet.value * (post?.weight.value / 1000) * post?.sea.value],
        ["Mechanical process", "Cutting", (post?.cutting.time * post?.cutting.electricity) * post?.processElectricityEF.value],
        ["Mechanical process", "Bending", (post?.bending.time * post?.bending.electricity) * post?.processElectricityEF.value],
        ["Mechanical process", "Welding", (post?.welding.time * post?.welding.electricity) * post?.processElectricityEF.value],
        ["Mechanical process", "Pressure test", (post?.pressureTest.time * post?.pressureTest.electricity) * post?.processElectricityEF.value],
        ["Mechanical process", "Drilliing", (post?.drilling.time * post?.drilling.electricity) * post?.processElectricityEF.value],
    ]

    const fixedSums = sums.map(s => typeof s[2] === "number" ? [s[0], s[1], Number(s[2].toFixed(2))] : s).sort(function (x, y) {
        return y[2] - x[2];
    })

    const categorySum = [
        ["Material", Number(((post?.weight.value * post?.materialEF.value) + (post?.materialEF.value2 * post?.weight.value * post?.electricityEF.value)).toFixed(2))],
        ["Transport", Number(((post?.lorry.coefficinet.value * (post?.weight.value / 1000) * post?.lorry.value) + (post?.sea.coefficinet.value * (post?.weight.value / 1000) * post?.sea.value)).toFixed(2))],
        ["Mechanical process", Number((((post?.cutting.time * post?.cutting.electricity) * post?.processElectricityEF.value)
            + ((post?.bending.time * post?.bending.electricity) * post?.processElectricityEF.value)
            + ((post?.welding.time * post?.welding.electricity) * post?.processElectricityEF.value)
            + ((post?.pressureTest.time * post?.pressureTest.electricity) * post?.processElectricityEF.value)
            + ((post?.drilling.time * post?.drilling.electricity) * post?.processElectricityEF.value)).toFixed(2))],
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