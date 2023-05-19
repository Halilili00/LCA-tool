import mongoose from "mongoose";

const apiKeysSchema = mongoose.Schema({
    name: String,
    email: String,
    sub: {type: String, default: ""},
    apiKey: {type: String, default: ""},
    createdAt: Date,
})

const ApiKeys = mongoose.model("ApiKeys", apiKeysSchema);

export default ApiKeys;