import { Sequelize } from "sequelize";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";

export const sequelize = new Sequelize("CyberCrew", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

User.belongsToMany(Product, { through: Cart, foreignKey: "userId" });
Product.belongsToMany(User, { through: Cart, foreignKey: "productId" });

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function startServer() {
  try {
    await sequelize.sync({ alter: true });
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
