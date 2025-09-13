import express from "express";
import { ProductControllers } from "../controllers/products.controllers/products.controllers.js";

export const router = express.Router();

router.get("/", ProductControllers.getProducts);
router.get("/:product_name", ProductControllers.getProduct);
router.post("/", ProductControllers.createProduct);
router.put("/:id", ProductControllers.updateProduct);
router.delete("/:id", ProductControllers.deleteProduct);
