import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Opinion extends Model {}

Opinion.init(
  {
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
  },
  { sequelize, modelName: "Opinion" }
);

export default Opinion;
