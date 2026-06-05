import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "tp_final_grupo_7",
  "tp_user",
  "tp1234",
  {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
  }
);

export default sequelize;