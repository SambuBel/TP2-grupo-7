import Usuario from "./Usuario.js";
import Libro from "./Libro.js";
import Opinion from "./Opinion.js";

Usuario.hasMany(Opinion, { foreignKey: "usuarioId" });
Opinion.belongsTo(Usuario, { foreignKey: "usuarioId" });

Libro.hasMany(Opinion, { foreignKey: "libroId" });
Opinion.belongsTo(Libro, { foreignKey: "libroId" });

export { Usuario, Libro, Opinion };
