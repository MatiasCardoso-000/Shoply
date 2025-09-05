import express from "express";
import { sequelize, startServer, testConnection } from "./database/dabatabase.js";
import { router as UserRouter } from "./routes/users.routes.js";
import { router as CheckOutRouter } from "./routes/checkout.routes.js";
import { router as WebHookRouter } from "./routes/webhook.route.js";
import { router as ProductsRouter } from "./routes/products.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use("/api/webhook", WebHookRouter);

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use("/api/auth", UserRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/checkout", CheckOutRouter);

testConnection();
startServer();
