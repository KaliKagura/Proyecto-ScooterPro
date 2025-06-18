import React, { useState } from "react";
import ProductosAdmin from "../components/admin/productosAdmin";
import ServiciosAdmin from "../components/admin/serviciosAdmin";
import VentasAdmin from "../components/admin/ventasAdmin";
import UsuariosAdmin from "../components/admin/usuariosAdmin";

const AdminPanel = () => {
  const [seccion, setSeccion] = useState("productos");

  const renderSeccion = () => {
    switch (seccion) {
      case "productos":
        return <ProductosAdmin />;
      case "servicios":
        return <ServiciosAdmin />;
      case "ventas":
        return <VentasAdmin />;
      case "usuarios":
        return <UsuariosAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center">⚙️ Admin</h2>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setSeccion("productos")}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              seccion === "productos"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-800 hover:bg-blue-700 hover:text-white"
            }`}
          >
            🛍️ Productos
          </button>
          <button
            onClick={() => setSeccion("servicios")}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              seccion === "servicios"
                ? "bg-green-600 text-white font-semibold"
                : "bg-gray-800 hover:bg-green-700 hover:text-white"
            }`}
          >
            🛠️ Servicios
          </button>
          <button
            onClick={() => setSeccion("ventas")}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              seccion === "ventas"
                ? "bg-yellow-600 text-white font-semibold"
                : "bg-gray-800 hover:bg-yellow-600 hover:text-white"
            }`}
          >
            💵 Ventas
          </button>
          <button
            onClick={() => setSeccion("usuarios")}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              seccion === "usuarios"
                ? "bg-purple-600 text-white font-semibold"
                : "bg-gray-800 hover:bg-purple-700 hover:text-white"
            }`}
          >
            👥 Usuarios
          </button>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Panel de Administración</h1>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          {renderSeccion()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;