import { Usuario, Opinion, Libro } from "../Models/index.js";
import { UsuarioService } from "../services/UsuarioService.js";
import { UsuarioController } from "../controllers/UsuarioController.js";

const usuarioService    = new UsuarioService(Usuario, Opinion, Libro);
const usuarioController = new UsuarioController(usuarioService);

export default usuarioController;
