export class LibroController {
  constructor(libroService) {
    this.libroService = libroService;
  }

  getAllLibros = async (_req, res) => {
    try {
      const libros = await this.libroService.getAllLibros();
      res.json({ success: true, data: libros });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getLibroById = async (req, res) => {
    try {
      const libro = await this.libroService.getLibroById(req.params.id);
      if (!libro) return res.status(404).json({ success: false, message: "Libro no encontrado" });
      res.json({ success: true, data: libro });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  createLibro = async (req, res) => {
    try {
      const { titulo, autor, genero, anio } = req.body;
      if (!titulo || !autor)
        return res.status(400).json({ success: false, message: "titulo y autor son requeridos" });

      const libro = await this.libroService.createLibro({ titulo, autor, genero, anio });
      res.status(201).json({ success: true, data: libro });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  updateLibro = async (req, res) => {
    try {
      const libro = await this.libroService.updateLibro(req.params.id, req.body);
      res.json({ success: true, data: libro });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  deleteLibro = async (req, res) => {
    try {
      await this.libroService.deleteLibro(req.params.id);
      res.json({ success: true, message: "Libro eliminado" });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}
