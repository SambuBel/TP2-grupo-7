import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tp_final_gr7", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 8889, 
});


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
