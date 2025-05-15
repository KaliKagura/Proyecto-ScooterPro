import express from "express";
import supabase from "../supabase/client.js";

const router = express.Router();

router.get("/:cliente_id", async (req, res) => {
  const { cliente_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("carrito")
      .select("*")
      .eq("cliente_id", cliente_id);

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener el carrito:", err.message);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

router.post("/", async (req, res) => {
  const { cliente_id, producto_id, cantidad } = req.body;

  try {
    const { data, error } = await supabase
      .from("carrito")
      .insert([{ cliente_id, producto_id, cantidad }]);

    if (error) throw error;
    res.status(201).json({ mensaje: "Producto agregado al carrito", data });
  } catch (err) {
    console.error("Error al agregar producto al carrito:", err.message);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

router.put("/:item_id", async (req, res) => {
  const { item_id } = req.params;
  const { cantidad } = req.body;

  if (typeof cantidad !== "number" || cantidad < 1) {
    return res.status(400).json({ error: "Cantidad inválida" });
  }

  try {
    const { data, error } = await supabase
      .from("carrito")
      .update({ cantidad })
      .eq("id", item_id);

    if (error) throw error;

    res.status(200).json({ mensaje: "Cantidad actualizada", data });
  } catch (err) {
    console.error("Error al actualizar cantidad:", err.message);
    res.status(500).json({ error: "Error al actualizar cantidad" });
  }
});

router.delete("/:item_id", async (req, res) => {
  const { item_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("carrito")
      .delete()
      .eq("id", item_id);

    if (error) throw error;
    res.status(200).json({ mensaje: "Producto eliminado del carrito", data });
  } catch (err) {
    console.error("Error al eliminar producto del carrito:", err.message);
    res.status(500).json({ error: "Error al eliminar producto del carrito" });
  }
});

router.delete("/cliente/:cliente_id", async (req, res) => {
  const { cliente_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("carrito")
      .delete()
      .eq("cliente_id", cliente_id);

    if (error) throw error;

    res.status(200).json({ mensaje: "Carrito eliminado", data });
  } catch (err) {
    console.error("Error al vaciar carrito:", err.message);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
});

export default router;
