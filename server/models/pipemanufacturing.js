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
    /*weight: {value: Number, coefficinet1: {value: Number, description: String}, coefficinet2: {value: Number, description: String}, coefficinet3: {value: Number, description: String},file: { data: String, name: String}},
    lorry: {disance: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    sea: {distance: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    cutting: {time: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    bending: {time: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    welding: {time: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    pressureTest: {time: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},
    drilling: {time: Number, coefficinet: {value: Number, description: String}, file: { data: String, name: String}},*/
})

const PipeManufacturing = mongoose.model("PipeManufacturing", pipemanufacturingSchema);

export default PipeManufacturing;