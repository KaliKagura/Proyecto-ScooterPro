import { useState } from "react";

const CrearProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen_url: "",
    tipo_producto: "",
    marca: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Producto creado correctamente");
        setProducto({
          nombre: "",
          descripcion: "",
          precio: "",
          stock: "",
          imagen_url: "",
          tipo_producto: "",
          marca: "",
        });
      } else {
        console.error("Error:", data.error);
        alert("Error al crear el producto");
      }
    } catch (err) {
      console.error("Error de red:", err.message);
      alert("Error de red al enviar el producto");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo producto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          placeholder="Precio"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="imagen_url"
          value={producto.imagen_url}
          onChange={handleChange}
          placeholder="URL de la imagen"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="tipo_producto"
          value={producto.tipo_producto}
          onChange={handleChange}
          placeholder="Tipo de producto"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="marca"
          value={producto.marca}
          onChange={handleChange}
          placeholder="Marca"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Crear producto
        </button>
      </form>
    </div>
  );
};

export default CrearProducto;
