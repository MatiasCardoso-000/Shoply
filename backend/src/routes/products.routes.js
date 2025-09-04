import express from "express";
import { ProductControllers } from "../controllers/products.controllers/products.controllers.js";

export const router = express.Router();

router.get("/", ProductControllers.getProducts);
router.get("/:id", ProductControllers.getProduct);
router.post("/", ProductControllers.createProduct);
router.put("/:id", ProductControllers.updateProduct);
router.delete("/:id", ProductControllers.deleteProduct);
