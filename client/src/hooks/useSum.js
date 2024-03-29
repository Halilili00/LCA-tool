const useSum = (post) => {
    const sums = [
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
    ]

    //muuta arvot 2 decimaalin arvoksi ja järjestä ne suuremmasta pienempään
    const fixedSums = sums.map(s => typeof s[2] === "number" ? [s[0], s[1], Number(s[2].toFixed(2))] : s).sort(function (x, y) {
        return y[2] - x[2];
    })


    const categorySum = [
        ["Steel", Number(((post?.steelRemoved.value * post?.materialEF.value) + ((post?.steel.value - post?.steelRemoved.value) * post?.materialEF.value)).toFixed(2))],
        ["Operations", Number(((post?.energyConsumption.value * post?.machiningTime.value * post?.machiningTime.coefficinet) + ((post?.machiningLiquidConsumption.value / post?.annualProduction.value) * post?.machiningLiquidConsumption.coefficinet) + ((post?.hydraulicOilConsumption.value / post?.annualProduction.value) * post?.hydraulicOilConsumption.coefficinet) + (post?.packagingPlastic.value * post?.packagingPlastic.coefficinet)).toFixed(2))],
        ["Site heating", Number((((post?.oil.value / post?.annualProduction.value) * post?.oil.coefficinet) + (( post?.electrycity.value / post?.annualProduction.value) * (( typeof post?.electrycity?.coefficinet.value !== 'undefined') ? post?.electrycity?.coefficinet.value : post?.electrycity?.coefficinet))).toFixed(2))],
        ["Transportation", Number((((40 / 100) * post?.euro5?.value * post?.trackCof?.value * (post?.steel.value / 2000)) + ((40 / 100) * post?.euro6?.value * post?.trackCof?.value * (post?.steel.value / 2000)) + ((40 / 100) * post?.euro7?.value * post?.trackCof?.value * (post?.steel.value / 2000)) + ((4000 / 100) * post?.roro?.value * post?.shipCof?.value * (post?.steel.value / 2000000))).toFixed(2))],
    ]

    const chartCategorySums = categorySum.filter(cs => cs[1] > 0).sort(function (x, y) {
        return y[2] - x[2];
    })

    const chartSums = fixedSums.filter(fs => fs[2] > 0)

    const totalSum = sums.map(d => typeof d[2] === "number" ? d[2] : null).reduce(function (x, y) {
        return x + y;
    }).toFixed(2)


    console.log(["Site heating", Number((((post?.oil.value / post?.annualProduction.value) * post?.oil.coefficinet) + (( post?.electrycity.value / post?.annualProduction.value) * ((typeof post?.electrycity?.coefficinet.value !== 'undefined') ? post?.electrycity?.coefficinet.value : post?.electrycity?.coefficinet))).toFixed(2))],)
    console.log(sums)   
    
    return {
        chartCategorySums, chartSums, totalSum, sums
    }
}

export default useSum