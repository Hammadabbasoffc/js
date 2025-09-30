import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./src/utils/connectDB.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})