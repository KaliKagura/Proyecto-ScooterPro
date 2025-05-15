import express from "express";
import supabase from "../supabase/client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("servicios").select("*");

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener servicios:", err.message);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

router.get("/cliente/:cliente_id", async (req, res) => {
  const { cliente_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .eq("cliente_id", cliente_id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener servicios del cliente:", err.message);
    res.status(500).json({ error: "Error al obtener servicios del cliente" });
  }
});

router.get("/tecnico/:tecnico_id", async (req, res) => {
  const { tecnico_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .eq("tecnico_id", tecnico_id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener servicios del técnico:", err.message);
    res.status(500).json({ error: "Error al obtener servicios del técnico" });
  }
});

router.post("/", async (req, res) => {
  const {
    fecha,
    tipo_servicio,
    cliente_id,
    marca_scooter,
    modelo_scooter,
    descripcion,
  } = req.body;

  try {
    const { data, error } = await supabase.from("servicios").insert([
      {
        fecha,
        tipo_servicio,
        cliente_id,
        marca_scooter,
        modelo_scooter,
        descripcion,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ mensaje: "Servicio agendado correctamente", data });
  } catch (err) {
    console.error("Error al agendar servicio:", err.message);
    res.status(500).json({ error: "Error al agendar servicio" });
  }
});

router.put("/:id/estado", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ error: 'Falta el campo "estado"' });
  }

  try {
    const { data, error } = await supabase
      .from("servicios")
      .update({ estado })
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ mensaje: "Estado actualizado", data });
  } catch (err) {
    console.error("Error al actualizar estado del servicio:", err.message);
    res.status(500).json({ error: "Error al actualizar estado del servicio" });
  }
});

export default router;
