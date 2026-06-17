import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import router from "./routes/router.js";
import notFound from "./middleware/notFound.js";
import sequelize from "./connection/sequelize.js";
import "./Models/index.js";
import { SERVER_PORT } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", router);

app.use(notFound);

await sequelize.sync({ alter: false });

app.listen(SERVER_PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);
});
