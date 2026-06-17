import { Usuario } from "../Models/index.js";
import { UsuarioService } from "../services/UsuarioService.js";
import { UsuarioController } from "../controllers/UsuarioController.js";

const usuarioService    = new UsuarioService(Usuario);
const usuarioController = new UsuarioController(usuarioService);

export default usuarioController;
