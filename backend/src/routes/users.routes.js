import express from "express";

import { validateToken } from "../middleware/validateToken.js";
import { UserControllers } from "../controllers/user.controllers/user.controllers.js";

export const router = express.Router();

router.post("/register", UserControllers.register);

router.post("/login",  UserControllers.login);

router.put("/", validateToken,UserControllers.updateUser);

router.delete("/",UserControllers.deleteUser );

router.get("/user/:id", UserControllers.getUser);

router.post("/refresh-token", (req, res) => {});
