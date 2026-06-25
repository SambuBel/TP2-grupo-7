export class LibroService {
  constructor(libroModel, opinionModel, usuarioModel) {
    this.libroModel = libroModel;
    this.opinionModel = opinionModel;
    this.usuarioModel = usuarioModel;
  }

  async getAllLibros() {
    return await this.libroModel.findAll();
  }

  async getLibroById(id) {
    return await this.libroModel.findByPk(id, {
      include: [
        {
          model: this.opinionModel,
          include: [{ model: this.usuarioModel, attributes: ["id", "nombre"] }],
        },
      ],
    });
  }

  async createLibro(data) {
    return await this.libroModel.create(data);
  }

  async updateLibro(id, data) {
    const libro = await this.libroModel.findByPk(id);
    if (!libro) throw new Error("Libro no encontrado");
    await libro.update(data);
    return libro;
  }

  async deleteLibro(id) {
    const libro = await this.libroModel.findByPk(id);
    if (!libro) throw new Error("Libro no encontrado");
    await libro.destroy();
  }
}
