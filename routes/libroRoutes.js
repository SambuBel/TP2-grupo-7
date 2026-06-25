import { Router } from "express";
import libroController from "../containers/libroContainer.js";
import { autenticar } from "../middleware/autenticar.js";

const libroRoutes = Router();

// Rutas públicas
libroRoutes.get("/",      libroController.getAllLibros);
libroRoutes.get("/:id",   libroController.getLibroById);

// Rutas protegidas
libroRoutes.post("/",        autenticar, libroController.createLibro);
libroRoutes.put("/:id",      autenticar, libroController.updateLibro);
libroRoutes.delete("/:id",   autenticar, libroController.deleteLibro);

export default libroRoutes;
