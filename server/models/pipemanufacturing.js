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
    materialEF: {value: Number, description: String}, 
    electricityInputEF: {value: Number, description: String}, 
    electricityEF: {value: Number, description: String},
    lorry: {value: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    sea: {value: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    cutting: {value: {time:Number, electricity: Number}, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    bending: {value: {time:Number, electricity: Number}, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    welding: {value: {time:Number, electricity: Number}, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    pressureTest: {value: {time:Number, electricity: Number}, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    drilling: {value: {time:Number, electricity: Number}, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
})

const PipeManufacturing = mongoose.model("PipeManufacturing", pipemanufacturingSchema);

export default PipeManufacturing;