import express from "express";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})