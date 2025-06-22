import express from "express";
import supabase from "../supabase/client.js";

const router = express.Router();

// Función para generar slug desde un texto
function generarSlug(texto) {
  return texto
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // espacios por guiones
    .replace(/[^\w\-]+/g, '')       // elimina caracteres no alfanuméricos
    .replace(/\-\-+/g, '-');        // múltiples guiones por uno solo
}

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("productos").select("*");

    if (error) {
      console.error("Error Supabase:", error);
      throw error;
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener productos:", err.message);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Obtener producto específico por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener el producto:", err.message);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// Buscar por nombre
router.get("/", async (req, res) => {
  const { nombre } = req.query;
  try {
    let query = supabase.from("productos").select("*");
    if (nombre) {
      query = query.ilike("nombre", `%${nombre}%`);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Crear nuevo producto
router.post("/", async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen_url, tipo_producto, marca } = req.body;

  if (!nombre || !precio || !stock) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const slug = generarSlug(nombre);
  console.log("Nombre recibido:", nombre);
  console.log("Slug generado:", slug);

  try {
    const { data, error } = await supabase
      .from("productos")
      .insert([{ nombre, descripcion, precio, stock, imagen_url, tipo_producto, marca, slug }])
      .select();

    if (error) throw error;

    res.status(201).json({ mensaje: "Producto creado", data });
  } catch (err) {
    console.error("Error al crear producto:", err.message);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// Actualizar producto existente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, imagen_url, tipo_producto, marca } = req.body;

  const slug = nombre ? generarSlug(nombre) : undefined;

  try {
    const updateData = { nombre, descripcion, precio, stock, imagen_url, tipo_producto, marca };
    if (slug) updateData.slug = slug;

    const { data, error } = await supabase
      .from("productos")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ mensaje: "Producto actualizado", data });
  } catch (err) {
    console.error("Error al actualizar producto:", err.message);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// Eliminar producto por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("productos")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ mensaje: "Producto eliminado", data });
  } catch (err) {
    console.error("Error al eliminar producto:", err.message);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;
