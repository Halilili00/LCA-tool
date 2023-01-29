import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
    machConter: {type: Number, default:0},
})

const Counter= mongoose.model("Counter", counterSchema);

export default Counter;