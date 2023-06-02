export const transportEFOptions = {
    land: [
        { id: 0, label: "Transport type", value: 0 },
        { id: 1, label: "market for transport, freight, lorry 16-32 metric ton, EURO5 | transport, freight, lorry 16-32 metric ton, EURO5 | Cutoff, U", value: 0.1646 },
        { id: 2, label: "market for transport, freight, lorry 16-32 metric ton, EURO6 | transport, freight, lorry 16-32 metric ton, EURO5 | Cutoff, U", value: 0.16139 },
        { id: 2, label: "market for transport, freight, lorry > 32 metric ton, EURO6 | transport, freight, lorry 16-32 metric ton, EURO5 | Cutoff, U", value: 0.08616 },
        { id: 2, label: "market for transport, freight train | transport, freight train | Cutoff, U", value: 0.0451 },
    ],
    water: [
        { id: 0, label: "Transport type", value: 0 },
        { id: 1, label: "market for transport, freight, sea, container ship | transport, freight, sea, container ship | Cutoff, U", value: 0.0094 },
    ],
    air: [
        { id: 0, label: "Transport type", value: 0 },
        {id: 1, label: "market for transport, freight, aircraft, generic", value: 0.75811}
    ]
}

export const electricityEFOptions = [
    { id: 0, label: "Countries", value: 0 },
    { id: 1, label: "Germany", value: 0.555 },
    { id: 2, label: "Italy", value: 0.394 },
    { id: 3, label: "Poland", value: 0.991 },
    { id: 4, label: "SE", value: 0.044 },
    { id: 5, label: "NL", value: 0.582 },
    { id: 6, label: "FI", value: 0.255 },
    { id: 7, label: "FI-Vaasan sahko", value: 0.148 },
]

export const materialEFOptions = [
    { id: 0, label: "Material type", value: 0, value2: 0 },
    { id: 1, label: "steel production, converter, low-alloyed | steel, low-alloyed | Cutoff, U", value: 2.03478, value2: 0.0242 },
    { id: 2, label: "steel production, converter, unalloyed | steel, unalloyed | Cutoff, U", value: 1.61835, value2: 0.0242 },
    { id: 3, label: "steel production, electric, chromium steel 18/8 | steel, chromium steel 18/8 | Cutoff, U", value: 4.30564, value2: 0.6250 },
    { id: 4, label: "steel production, electric, low-alloyed | steel, low-alloyed | Cutoff, U", value: 0.32791, value2: 0.54972 },
    { id: 5, label: "cast iron production | cast iron | Cutoff, U", value: 1.34687, value2: 0.42361 },
    { id: 6, label: "Ductile iron production", value: 1.63668, value2: 0.42361 },
]

export const efOfOtherProcess = [
    { id: 0, label: "Material type", value: 0 },
    { id: 1, label: "market for lubricating oil | lubricating oil | Cutoff, U", value: 1.199 },
    { id: 2, label: "tap water production, conventional treatment | tap water | Cutoff, U", value: 0.00025 },
    { id: 3, label: "market for packaging film, low density polyethylene", value: 3.065 },
    { id: 4, label: "market for corrugated board box", value: 0.970 },
    { id: 5, label: "cutting fluid", value: 1.72816 },
    { id: 6, label: "Mineral oil waste", value: 21.29356589 },
    { id: 7, label: "Wastewater", value: 0.272 },
    { id: 8, label: "Metal scrap", value: 21.29356589 },
]