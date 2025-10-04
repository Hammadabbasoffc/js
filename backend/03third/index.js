import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./src/utils/connectDB.js"
import userRouter from "./src/routes/user.route.js"
import productRouter from "./src/routes/product.route.js";

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
// To serve uploaded files statically
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter)
app.use("/api/v1/products", productRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})