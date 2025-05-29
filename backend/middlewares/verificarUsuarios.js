import { supabase } from "../supabase/client.js";

export const verificarUsuario = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: "No autorizado" });

  req.user = user;
  next();
};