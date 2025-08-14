import dotenv from 'dotenv'
import logRouter from './routers/logs.router.js';
import express from "express"
import cors from "cors"
import mongoose from 'mongoose';
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/api/logs",logRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    
});