import { Sequelize } from "sequelize";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } from "../config/config.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

try {
  await sequelize.authenticate();
  console.log("Conexión exitosa a la DB");
} catch (error) {
  console.error("Error de conexión:", error);
}

export default sequelize;
