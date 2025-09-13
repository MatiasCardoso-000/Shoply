import { DataTypes } from "sequelize";
import { sequelize } from "../database/dabatabase.js";

export const Cart = sequelize.define('cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});