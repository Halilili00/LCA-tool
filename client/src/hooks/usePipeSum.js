import React from 'react'

const usePipeSum = (post) => {
    const sums = [
        ["Material", "Materiali", (post?.weight.value * post?.materialEF.value) + (post?.electricityInputEF.value * post?.weight.value * post?.electricityEF.value)],
        ["Transport", "Lorry", post?.lorry.coefficinet.value * (post?.weight.value / 1000) * post?.lorry.value],
        ["Transport", "Sea", post?.sea.coefficinet.value * (post?.weight.value / 1000) * post?.sea.value],
        ["Mechanical process", "Cutting", (post?.cutting.value.time * post?.cutting.value.electricity) * post?.cutting.coefficinet.value],
        ["Mechanical process", "Bending", (post?.bending.value.time * post?.bending.value.electricity) * post?.bending.coefficinet.value],
        ["Mechanical process", "Welding", (post?.welding.value.time * post?.welding.value.electricity) * post?.welding.coefficinet.value],
        ["Mechanical process", "Pressure test", (post?.pressureTest.value.time * post?.pressureTest.value.electricity) * post?.pressureTest.coefficinet.value],
        ["Mechanical process", "Drilliing", (post?.drilling.value.time * post?.drilling.value.electricity) * post?.drilling.coefficinet.value],
    ]

    const fixedSums = sums.map(s => typeof s[2] === "number" ? [s[0], s[1], Number(s[2].toFixed(2))] : s).sort(function (x, y) {
        return y[2] - x[2];
    })

    const categorySum = [
        ["Material", Number(((post?.weight.value * post?.materialEF.value) + (post?.electricityInputEF.value * post?.weight.value * post?.electricityEF.value)).toFixed(2))],
        ["Transport", Number(((post?.lorry.coefficinet.value * (post?.weight.value / 1000) * post?.lorry.value) + (post?.sea.coefficinet.value * (post?.weight.value / 1000) * post?.sea.value)).toFixed(2))],
        ["Mechanical process", Number((((post?.cutting.value.time * post?.cutting.value.electricity) * post?.cutting.coefficinet.value)
            + ((post?.bending.value.time * post?.bending.value.electricity) * post?.bending.coefficinet.value)
            + ((post?.welding.value.time * post?.welding.value.electricity) * post?.welding.coefficinet.value)
            + ((post?.pressureTest.value.time * post?.pressureTest.value.electricity) * post?.pressureTest.coefficinet.value)
            + ((post?.drilling.value.time * post?.drilling.value.electricity) * post?.drilling.coefficinet.value)).toFixed(2))],
    ]

    const chartCategorySums = categorySum.filter(cs => cs[1] > 0).sort(function (x, y) {
        return y[2] - x[2];
    })

    const chartSums = fixedSums.filter(fs => fs[2] > 0)

    const totalSum = sums.map(d => typeof d[2] === "number" ? d[2] : null).reduce(function (x, y) {
        return x + y;
    }).toFixed(2)

    console.log(sums)
    return {
        chartCategorySums, chartSums, totalSum, sums
    }
}

export default usePipeSum