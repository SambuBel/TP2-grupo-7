import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Libro extends Model {}

Libro.init(
  {
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { len: [1, 200], notEmpty: true },
    },
    autor: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true },
    },
    genero: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 1000, max: 2100 },
    },
  },
  { sequelize, modelName: "Libro" }
);

export default Libro;
