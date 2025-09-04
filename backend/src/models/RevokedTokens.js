import { DataTypes } from "sequelize";
import { sequelize } from "../database/dabatabase.js";

export const RevokedTokensModel = sequelize.define("revokedToken", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
  }
});
