import express from "express";

import { validateToken } from "../middleware/validateToken.js";
import { UserControllers } from "../controllers/user.controllers/user.controllers.js";
import { validateZodSchema } from "../middleware/validateSchema.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";

export const router = express.Router();

router.post("/register", validateZodSchema(registerSchema), UserControllers.register);

router.post("/login", validateZodSchema(loginSchema),UserControllers.login);

router.post("/logout",  UserControllers.logout);

router.put("/", validateToken, UserControllers.updateUser);

router.delete("/", UserControllers.deleteUser);

router.get("/user/:id", UserControllers.getUser);

router.post("/refresh-token",UserControllers.refreshToken);
