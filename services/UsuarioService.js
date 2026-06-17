import { generateToken, verifyToken } from "../utils/jwt.js";

export class UsuarioService {
  constructor(usuarioModel) {
    this.usuarioModel = usuarioModel;
  }

  async getAllUsuarios() {
    return await this.usuarioModel.findAll();
  }

  async getUsuarioById(id) {
    return await this.usuarioModel.findByPk(id);
  }

  async createUsuario(data) {
    return await this.usuarioModel.create(data);
  }

  async login({ email, password }) {
    const usuario = await this.usuarioModel.findOne({ where: { email } });
    if (!usuario) throw new Error("Usuario no encontrado");

    const isValid = await this.usuarioModel.validatePassword(password, usuario.password);
    if (!isValid) throw new Error("Contraseña incorrecta");

    const token = generateToken({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
    return { token, id: usuario.id };
  }

  async me(token) {
    return verifyToken(token);
  }
}
