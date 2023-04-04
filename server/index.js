import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.js"
import adminsRouter from "./routes/adminsRouter.js"
import Machining from "./models/machining.js";

dotenv.config();
const app = express();

app.use(express.json({limit: "100mb"}));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Work")
})

app.use("/api/posts", postRouter)
app.use("/api/user" ,adminsRouter)

const PORT = process.env.PORT || 5000;
//mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true,}) // for deploying
mongoose.connect(process.env.CONNECTION_URL) // for tesging when coding
/*
//For deleting file prop from object field
.then(()=> {
    return Machining.updateMany(
        {},
        { $unset: { 'shipCof.file': 1} }
    )
})*/
.then(() => app.listen(PORT, () => console.log(`Server is runing ${PORT}`)))
.catch((error) => console.group(error.message));