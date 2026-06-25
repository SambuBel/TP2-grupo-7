import { Libro, Opinion, Usuario } from "../Models/index.js";
import { LibroService } from "../services/LibroService.js";
import { LibroController } from "../controllers/LibroController.js";

const libroService    = new LibroService(Libro, Opinion, Usuario);
const libroController = new LibroController(libroService);

export default libroController;
