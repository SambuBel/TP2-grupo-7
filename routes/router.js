import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes.js";
import libroRoutes   from "./libroRoutes.js";
import opinionRoutes from "./opinionroutes.js";

const router = Router();

router.use("/usuarios",  usuarioRoutes);
router.use("/libros",    libroRoutes);
router.use("/opiniones", opinionRoutes);

export default router;
