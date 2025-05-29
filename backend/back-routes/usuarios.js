import express from "express";
import supabase from "../supabase/client.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";
import { verificarUsuario } from "../middlewares/verificarUsuarios.js";

const router = express.Router();

router.get("/", verificarUsuario, async (req, res) => {
  try {
    const { data, error } = await supabase.from("usuarios").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener usuarios:", err.message);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener usuario:", err.message);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

router.post("/", verificarUsuario, async (req, res) => {
  const userId = req.user.id; // viene desde Supabase Auth
  const { nombre, direccion, telefono } = req.body;
  const rol = "cliente"; // rol predeterminado

  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre" });
  }

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ id: userId, nombre, rol, direccion, telefono }]);

    if (error) throw error;
    res.status(201).json({ mensaje: "Usuario creado correctamente", data });
  } catch (err) {
    console.error("Error al crear usuario:", err.message);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.post("/crear-usuario-rol", verificarAdmin, async (req, res) => {
  const { id, nombre, rol, direccion, telefono } = req.body;

  const rolesValidos = ["cliente", "tecnico", "admin"];
  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ error: "Rol inválido" });
  }

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ id, nombre, rol, direccion, telefono }]);

    if (error) throw error;
    res.status(201).json({ mensaje: "Usuario creado con rol", data });
  } catch (err) {
    console.error("Error al crear usuario con rol:", err.message);
    res.status(500).json({ error: "Error al crear usuario con rol" });
  }
});

router.patch("/:id/rol", verificarAdmin, async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  const rolesValidos = ["cliente", "tecnico", "admin"];
  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ error: "Rol inválido" });
  }

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update({ rol })
      .eq("id", id);

    if (error) throw error;
    res.status(200).json({ mensaje: "Rol actualizado", data });
  } catch (err) {
    console.error("Error al actualizar rol:", err.message);
    res.status(500).json({ error: "Error al actualizar rol" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;
    res.status(200).json({ mensaje: "Usuario actualizado", data });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) throw error;
    res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err.message);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
