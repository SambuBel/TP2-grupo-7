import { Router } from "express";
import usuarioController from "../containers/usuarioContainer.js";
import { autenticar } from "../middleware/autenticar.js";

const usuarioRoutes = Router();

// Rutas públicas
usuarioRoutes.post("/login", usuarioController.login);
usuarioRoutes.post("/",      usuarioController.createUsuario);

// Rutas protegidas
usuarioRoutes.get("/me",     autenticar, usuarioController.me);
usuarioRoutes.get("/",       autenticar, usuarioController.getAllUsuarios);
usuarioRoutes.get("/:id",    autenticar, usuarioController.getUsuarioById);

export default usuarioRoutes;
