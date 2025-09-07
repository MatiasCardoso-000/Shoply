import express from "express";
import { CartControllers } from "../controllers/cart.controllers/cart.controllers.js";
import { validateToken } from "../middleware/validateToken.js";


export const router = express.Router()


router.get('/', validateToken, CartControllers.getCart)
router.post('/', CartControllers.addProductToCart)