import React from "react";

const ventasFicticias = [
  {
    id: 201,
    producto: "Scooter Eléctrico X10",
    cliente: "Pedro Gómez",
    fecha: "2025-06-09",
    total: 349990,
  },
  {
    id: 202,
    producto: "Scooter Urbano Eco",
    cliente: "Laura Martínez",
    fecha: "2025-06-11",
    total: 189990,
  },
  {
    id: 203,
    producto: "Scooter Compact Pro",
    cliente: "Jorge Fuentes",
    fecha: "2025-06-13",
    total: 259990,
  },
];

const VentasAdmin = () => {
  const totalGanancias = ventasFicticias.reduce((sum, venta) => sum + venta.total, 0);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Registros de Ventas</h2>
      <table className="w-full text-left border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Producto</th>
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {ventasFicticias.map((venta) => (
            <tr key={venta.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{venta.producto}</td>
              <td className="py-2 px-4 border-b">{venta.cliente}</td>
              <td className="py-2 px-4 border-b">{venta.fecha}</td>
              <td className="py-2 px-4 border-b">${venta.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right font-semibold text-green-700">
        Total de ingresos: ${totalGanancias.toLocaleString()}
      </div>
    </div>
  );
};

export default VentasAdmin;