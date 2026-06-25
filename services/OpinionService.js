export class OpinionService {
  constructor(opinionModel, libroModel, usuarioModel) {
    this.opinionModel = opinionModel;
    this.libroModel = libroModel;
    this.usuarioModel = usuarioModel;
  }

  async getAllOpiniones() {
    return await this.opinionModel.findAll({
      include: [
        { model: this.usuarioModel, attributes: ["id", "nombre"] },
        { model: this.libroModel, attributes: ["id", "titulo", "autor"] },
      ],
    });
  }

  async getOpinionById(id) {
    return await this.opinionModel.findByPk(id, {
      include: [
        { model: this.usuarioModel, attributes: ["id", "nombre"] },
        { model: this.libroModel, attributes: ["id", "titulo", "autor"] },
      ],
    });
  }

  async createOpinion({ texto, puntuacion, libroId, usuarioId }) {
    const libro = await this.libroModel.findByPk(libroId);
    if (!libro) throw new Error("Libro no encontrado");
    return await this.opinionModel.create({ texto, puntuacion, libroId, usuarioId });
  }

  async updateOpinion(id, data) {
    const opinion = await this.opinionModel.findByPk(id);
    if (!opinion) throw new Error("Opinión no encontrada");
    await opinion.update(data);
    return opinion;
  }

  async deleteOpinion(id) {
    const opinion = await this.opinionModel.findByPk(id);
    if (!opinion) throw new Error("Opinión no encontrada");
    await opinion.destroy();
  }
}
