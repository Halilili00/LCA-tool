import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
    machCounter: {type: Number, default:0},
})

const Counter= mongoose.model("Counter", counterSchema);

export default Counter;