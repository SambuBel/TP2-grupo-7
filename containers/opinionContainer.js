import { Opinion, Libro, Usuario } from "../Models/index.js";
import { OpinionService } from "../services/OpinionService.js";
import { OpinionController } from "../controllers/OpinionController.js";

const opinionService    = new OpinionService(Opinion, Libro, Usuario);
const opinionController = new OpinionController(opinionService);

export default opinionController;
