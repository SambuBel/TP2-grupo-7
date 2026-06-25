export class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  getAllUsuarios = async (_req, res) => {
    try {
      const usuarios = await this.usuarioService.getAllUsuarios();
      res.json({ success: true, data: usuarios });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getUsuarioById = async (req, res) => {
    try {
      const usuario = await this.usuarioService.getUsuarioById(req.params.id);
      if (!usuario) return res.status(404).json({ success: false, message: "No encontrado" });
      res.json({ success: true, data: usuario });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  createUsuario = async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
      if (!nombre || !email || !password)
        return res.status(400).json({ success: false, message: "nombre, email y password son requeridos" });

      const usuario = await this.usuarioService.createUsuario({ nombre, email, password });
      res.status(201).json({ success: true, data: usuario });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  updateUsuario = async (req, res) => {
    try {
      const usuario = await this.usuarioService.updateUsuario(req.params.id, req.body);
      res.json({ success: true, data: usuario });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  deleteUsuario = async (req, res) => {
    try {
      await this.usuarioService.deleteUsuario(req.params.id);
      res.json({ success: true, message: "Usuario eliminado" });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  getOpinionesByUsuario = async (req, res) => {
    try {
      const data = await this.usuarioService.getOpinionesByUsuario(req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { token, id } = await this.usuarioService.login(req.body);
      res.cookie("payload", token, { httpOnly: true });
      res.json({ success: true, data: { id } });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  };

  logout = (_req, res) => {
    res.clearCookie("payload");
    res.json({ success: true, message: "Sesión cerrada" });
  };

  me = (req, res) => {
    res.json({ success: true, data: req.usuario });
  };
}
