import React from "react";

const usuariosFicticios = [
  { id: 301, nombre: "admin@scooterpro.cl", rol: "admin", estado: "activo" },
  { id: 302, nombre: "cliente1@mail.com", rol: "cliente", estado: "activo" },
  { id: 303, nombre: "cliente2@mail.com", rol: "cliente", estado: "suspendido" },
];

const UsuariosAdmin = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
      <table className="w-full text-left border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Correo</th>
            <th className="py-2 px-4 border-b">Rol</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFicticios.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.nombre}</td>
              <td className="py-2 px-4 border-b capitalize">{user.rol}</td>
              <td className="py-2 px-4 border-b capitalize">{user.estado}</td>
              <td className="py-2 px-4 border-b">
                <button className="mr-2 text-yellow-500 hover:underline">Editar</button>
                <button className="text-red-500 hover:underline">Suspender</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosAdmin;