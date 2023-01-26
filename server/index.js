import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.js"
import adminsRouter from "./routes/adminsRouter.js"

dotenv.config();
const app = express();

app.use(express.json({limit: "30mb"}));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Work")
})

app.use("/posts", postRouter)
app.use('/user', adminsRouter)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server is runing ${PORT}`)))
.catch((error) => console.group(error.message));