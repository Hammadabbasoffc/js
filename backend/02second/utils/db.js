import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.DATABASE_URL;

const db = () => {
    mongoose.connect(MONGO_URL)
        .then(() => console.log("Database connected"))
        .catch((err) => console.log(err));
}

export default db;
