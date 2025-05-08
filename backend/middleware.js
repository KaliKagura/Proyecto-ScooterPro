import jwt from "jsonwebtoken";
import supabase from "./supabase/client.js";

export async function verificarAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.decode(token);
    const userId = decoded?.sub;

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", userId)
      .single();

    if (error || !usuario || usuario.rol !== "admin") {
      return res
        .status(403)
        .json({ error: "Acceso restringido a administradores" });
    }

    req.userId = userId;
    next();
  } catch (err) {
    console.error("Error en middleware:", err.message);
    res.status(403).json({ error: "Token inválido" });
  }
}
