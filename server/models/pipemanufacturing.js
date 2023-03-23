import mongoose from "mongoose";

const pipemanufacturingSchema = mongoose.Schema({ 
    lcaID: String,
    creatorID: String,
    createdAt: Date,
    tempID: String,
    partName: String, 
    partID: String,
    creator: String,
    description: String,
    productionSite: {
        factoryName: String,
        address: String
    },
    validDate: {
        start: Date,
        end: Date
    },
    weight: {value: Number,file: { data: String, name: String}},
    materialEF: {value: Number, value2: Number, description: String}, 
    electricityEF: {value: Number, description: String},
    lorry: {value: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    sea: {value: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    processElectricityEF: {value: Number, description: String, file: { data: String, name: String}},
    cutting: {time:Number, electricity: Number},
    bending: {time:Number, electricity: Number},
    welding: {time:Number, electricity: Number},
    pressureTest: {time:Number, electricity: Number},
    drilling: {time:Number, electricity: Number},
})

const PipeManufacturing = mongoose.model("PipeManufacturing", pipemanufacturingSchema);

export default PipeManufacturing;