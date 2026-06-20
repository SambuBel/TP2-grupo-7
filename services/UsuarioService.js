import { generateToken } from "../utils/jwt.js";

export class UsuarioService {
  constructor(usuarioModel) {
    this.usuarioModel = usuarioModel;
  }

  #sinPassword = { attributes: { exclude: ["password"] } };

  async getAllUsuarios() {
    return await this.usuarioModel.findAll(this.#sinPassword);
  }

  async getUsuarioById(id) {
    return await this.usuarioModel.findByPk(id, this.#sinPassword);
  }

  async createUsuario(data) {
    const usuario = await this.usuarioModel.create(data);
    const { password: _, ...sin } = usuario.toJSON();
    return sin;
  }

  async updateUsuario(id, data) {
    const usuario = await this.usuarioModel.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    await usuario.update(data);
    const { password: _, ...sin } = usuario.toJSON();
    return sin;
  }

  async deleteUsuario(id) {
    const usuario = await this.usuarioModel.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    await usuario.destroy();
  }

  async login({ email, password }) {
    const usuario = await this.usuarioModel.findOne({ where: { email } });
    if (!usuario) throw new Error("Usuario no encontrado");

    const isValid = await this.usuarioModel.validatePassword(password, usuario.password);
    if (!isValid) throw new Error("Contraseña incorrecta");

    const token = generateToken({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
    return { token, id: usuario.id };
  }
}
