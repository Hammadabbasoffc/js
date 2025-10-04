import fs from "fs";
import Product from "../models/Product.model.js";

const createProduct = async (req, res) => {
    const { name, price, description, stock } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (!name || !price || !description || !stock) {
        // remove uploaded file since data is invalid
        fs.unlink(file.path, (err) => {
            if (err) console.error("Failed to delete file:", err);
        });

        return res.status(400).json({
            success: false,
            message: "name, price, description and stock are required",
        });
    }

    try {
        const product = await Product.create({
            name,
            price,
            description,
            stock,
            images: file.path, // store full path in DB
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        // remove uploaded file if DB insertion fails
        fs.unlink(file.path, (err) => {
            if (err) console.error("Failed to delete file:", err);
        });

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { createProduct };
