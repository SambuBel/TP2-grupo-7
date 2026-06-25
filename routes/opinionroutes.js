import { Router } from "express";
import opinionController from "../containers/opinionContainer.js";
import { autenticar } from "../middleware/autenticar.js";

const opinionRoutes = Router();

// Rutas públicas
opinionRoutes.get("/",      opinionController.getAllOpiniones);
opinionRoutes.get("/:id",   opinionController.getOpinionById);

// Rutas protegidas (crear, editar y borrar requieren login)
opinionRoutes.post("/",        autenticar, opinionController.createOpinion);
opinionRoutes.put("/:id",      autenticar, opinionController.updateOpinion);
opinionRoutes.delete("/:id",   autenticar, opinionController.deleteOpinion);

export default opinionRoutes;
