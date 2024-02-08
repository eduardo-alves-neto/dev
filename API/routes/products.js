import express from "express";
import {getProducts} from "../controllers/product.js"

const ProductRouter = express.Router();

ProductRouter.get("/", getProducts)

export default ProductRouter;