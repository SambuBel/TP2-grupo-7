import { Router } from "express";
import usuarioController from "../containers/usuarioContainer.js";
import { autenticar } from "../middleware/autenticar.js";

const usuarioRoutes = Router();

// Rutas públicas
usuarioRoutes.post("/login",   usuarioController.login);
usuarioRoutes.post("/",        usuarioController.createUsuario);

// Rutas protegidas
usuarioRoutes.post("/logout",  autenticar, usuarioController.logout);
usuarioRoutes.get("/me",       autenticar, usuarioController.me);
usuarioRoutes.get("/",         autenticar, usuarioController.getAllUsuarios);
usuarioRoutes.get("/:id",           autenticar, usuarioController.getUsuarioById);
usuarioRoutes.get("/:id/opiniones", autenticar, usuarioController.getOpinionesByUsuario);
usuarioRoutes.put("/:id",      autenticar, usuarioController.updateUsuario);
usuarioRoutes.delete("/:id",   autenticar, usuarioController.deleteUsuario);

export default usuarioRoutes;
