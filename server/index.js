import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.js"
import adminsRouter from "./routes/adminsRouter.js"
import apiKeysRouter from "./routes/apiKeysRouter.js"
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

dotenv.config();
const app = express();

const options = {
    definition: {
        openapi: '3.0.0', // version of OpenAPI Specification
        info: {
          title: 'My API', // title of your API
          version: '1.0.0', // version of your API
        },
        servers: [
            {
              url: "http://localhost:5000",
              url: "https://lca-tool.link",
            },
          ],
      },
      apis: ['./routes/*.js', './models/*.js'], // path to your API route files
}

const specs = swaggerJSDoc(options);
app.use('/api-docs', serve, setup(specs));

app.use(express.json({limit: "100mb"}));
app.use(cors());

app.get("/api/test", (req, res) => {
    res.send("Server work")
})

app.use("/api/posts", postRouter)
app.use("/api/user" , adminsRouter)
app.use("/api/apikey", apiKeysRouter)

const PORT = process.env.PORT || 5000;
//mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true,}) // for deploying
mongoose.connect(process.env.CONNECTION_URL) // for tesging when coding
.then(() => app.listen(PORT, () => console.log(`Server is runing ${PORT}`)))
.catch((error) => console.group(error.message));


/*
const PORT = process.env.PORT || 5000;
//mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true,}) // for deploying
mongoose.connect(process.env.CONNECTION_URL) // for tesging when coding

//For deleting file prop from object field
.then(()=> {
    return Machining.updateMany(
        {},
        { $unset: { 'shipCof.file': 1} }
    )
})
.then(() => app.listen(PORT, () => console.log(`Server is runing ${PORT}`)))
.catch((error) => console.group(error.message));
*/