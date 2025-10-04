import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { upload } from "../middlewares/multer.js";

const productRouter = Router();

productRouter.post(
    "/create",
    isLoggedIn,
    upload.single("image"),  // using our middleware
    createProduct
);

export default productRouter;
