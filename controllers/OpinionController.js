export class OpinionController {
  constructor(opinionService) {
    this.opinionService = opinionService;
  }

  getAllOpiniones = async (_req, res) => {
    try {
      const opiniones = await this.opinionService.getAllOpiniones();
      res.json({ success: true, data: opiniones });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getOpinionById = async (req, res) => {
    try {
      const opinion = await this.opinionService.getOpinionById(req.params.id);
      if (!opinion) return res.status(404).json({ success: false, message: "Opinión no encontrada" });
      res.json({ success: true, data: opinion });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  createOpinion = async (req, res) => {
    try {
      const { texto, puntuacion, libroId } = req.body;
      if (!texto || !puntuacion || !libroId)
        return res.status(400).json({ success: false, message: "texto, puntuacion y libroId son requeridos" });

      const usuarioId = req.usuario.id;
      const opinion = await this.opinionService.createOpinion({ texto, puntuacion, libroId, usuarioId });
      res.status(201).json({ success: true, data: opinion });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  updateOpinion = async (req, res) => {
    try {
      const opinion = await this.opinionService.updateOpinion(req.params.id, req.body);
      res.json({ success: true, data: opinion });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  deleteOpinion = async (req, res) => {
    try {
      await this.opinionService.deleteOpinion(req.params.id);
      res.json({ success: true, message: "Opinión eliminada" });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}
