import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js"

// Config
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/api/user', userRoute)

// Mongoose Setup & Server Start
const PORT = process.env.PORT || 1337
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
})
.catch((error) => console.log(`${error} did not connect`))