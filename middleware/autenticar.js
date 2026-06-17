import { verifyToken } from "../utils/jwt.js";

export function autenticar(req, res, next) {
  try {
    const token = req.cookies.payload;
    if (!token) return res.status(401).json({ error: "No autenticado" });

    const payload = verifyToken(token);
    req.usuario = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}
