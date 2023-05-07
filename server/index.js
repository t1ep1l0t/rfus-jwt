import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import router from "./router/AuthRouter.js";
dotenv.config();
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);


const start = async () => {
    try {
        await mongoose.connect(process.env.BD);
        app.listen(process.env.PORT, () => console.log(`Server start on http://localhost:${process.env.PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();
