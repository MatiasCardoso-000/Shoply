import express from "express";
import { sequelize } from "./database/dabatabase.js";
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

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log("Todos los modelos fueron sincronizados correctamente. ✅");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(
      "No se pudo sincronizar los modelos con la base de datos:",
      error
    );
  }
}

testConnection();
startServer();
