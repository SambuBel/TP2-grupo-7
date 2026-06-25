import { generateToken } from "../utils/jwt.js";

export class UsuarioService {
  constructor(usuarioModel, opinionModel, libroModel) {
    this.usuarioModel = usuarioModel;
    this.opinionModel = opinionModel;
    this.libroModel   = libroModel;
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

  async getOpinionesByUsuario(id) {
    const usuario = await this.usuarioModel.findByPk(id, { attributes: { exclude: ["password"] } });
    if (!usuario) throw new Error("Usuario no encontrado");
    const opiniones = await this.opinionModel.findAll({
      where: { usuarioId: id },
      include: [{ model: this.libroModel, attributes: ["id", "titulo", "autor"] }],
    });
    return { usuario, opiniones };
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
