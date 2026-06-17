export class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  getAllUsuarios = async (req, res) => {
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
      const usuario = await this.usuarioService.createUsuario(req.body);
      res.status(201).json({ success: true, data: usuario });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { token, id } = await this.usuarioService.login(req.body);
      res.cookie("payload", token, { httpOnly: true });
      res.json({ success: true, message: id });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  };

  me = async (req, res) => {
    try {
      const token = req.cookies.payload;
      const data = await this.usuarioService.me(token);
      res.json({ success: true, message: data });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  };
}
