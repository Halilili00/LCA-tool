import mongoose from "mongoose";

const adminsSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, default: false}
})

const Admins = mongoose.model("Admins", adminsSchema);

export default Admins;