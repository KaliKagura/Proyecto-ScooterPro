import React from "react";

const productosFicticios = [
  {
    id: 1,
    nombre: "Scooter Eléctrico X10",
    descripcion:
      "Scooter de alta velocidad, batería de litio, frenos de disco.",
    precio: 349990,
    stock: 12,
  },
  {
    id: 2,
    nombre: "Scooter Compact Pro",
    descripcion: "Modelo ligero, ideal para ciudad. Autonomía de 25 km.",
    precio: 259990,
    stock: 8,
  },
  {
    id: 3,
    nombre: "Scooter Urbano Eco",
    descripcion: "Versión económica y resistente. Ideal para estudiantes.",
    precio: 189990,
    stock: 20,
  },
];

const ProductosAdmin = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Productos</h2>

      <table className="w-full text-left border border-gray-200 shadow-sm rounded overflow-hidden">
        <thead className="bg-blue-50 text-blue-800">
          <tr>
            <th className="py-3 px-4 border-b">Nombre</th>
            <th className="py-3 px-4 border-b">Descripción</th>
            <th className="py-3 px-4 border-b">Precio</th>
            <th className="py-3 px-4 border-b">Stock</th>
            <th className="py-3 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFicticios.map((producto) => (
            <tr key={producto.id} className="hover:bg-blue-50 transition-all">
              <td className="py-3 px-4 border-b">{producto.nombre}</td>
              <td className="py-3 px-4 border-b">{producto.descripcion}</td>
              <td className="py-3 px-4 border-b">
                ${producto.precio.toLocaleString()}
              </td>
              <td className="py-3 px-4 border-b">{producto.stock}</td>
              <td className="py-3 px-4 border-b space-x-2">
                <button className="bg-orange-500 hover:bg-otange-600 text-white px-3 py-1 rounded text-sm shadow-sm">
                  Editar
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow-sm">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosAdmin;
