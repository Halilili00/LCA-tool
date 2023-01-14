import mongoose from "mongoose";

const machiningSchema = mongoose.Schema({ 
    partName: String, 
    partId: String,
    creator: String,
    productionSite: {
        factoryName: String,
        address: String
    },
    validDate: {
        start: Date,
        end: Date
    },
    annualProduction: { value: Number, file: { data: String, name: String} },
    steel: { value: Number, file: { data: String, name: String} },
    steelRemoved: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    partWeight: {coefficinet: Number, file: { data: String, name: String}},
    energyConsumption: { value: Number, file: { data: String, name: String} },
    machiningTime: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    machiningLiquidConsumption: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    hydraulicOilConsumption: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    packagingPlastic: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    oil: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    electrycity: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    euro5: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    euro6: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    euro7: { value: Number, coefficinet: Number, file: { data: String, name: String} },
    roro: { value: Number, coefficinet: Number, file: { data: String, name: String} },
})

const Machining = mongoose.model("Machining", machiningSchema);

export default Machining;