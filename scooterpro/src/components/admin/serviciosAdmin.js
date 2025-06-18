import React from "react";

const serviciosFicticios = [
  {
    id: 101,
    cliente: "Juan Pérez",
    tipo: "Mantención general",
    fecha: "2025-06-10",
    estado: "Completado",
  },
  {
    id: 102,
    cliente: "Ana López",
    tipo: "Cambio de batería",
    fecha: "2025-06-12",
    estado: "Pendiente",
  },
  {
    id: 103,
    cliente: "Carlos Ruiz",
    tipo: "Revisión de frenos",
    fecha: "2025-06-15",
    estado: "En progreso",
  },
];

const ServiciosAdmin = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Servicios</h2>
      <table className="w-full text-left border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {serviciosFicticios.map((serv) => (
            <tr key={serv.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{serv.cliente}</td>
              <td className="py-2 px-4 border-b">{serv.tipo}</td>
              <td className="py-2 px-4 border-b">{serv.fecha}</td>
              <td className="py-2 px-4 border-b">{serv.estado}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline">Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiciosAdmin;