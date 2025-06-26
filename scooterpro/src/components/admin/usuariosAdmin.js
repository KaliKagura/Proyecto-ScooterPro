import React, { useEffect, useState } from "react";
import supabase from "../../supabase/supabaseClient";
import CrearTecnicoModal from "./crearTecnico";
import EditarUsuario from "./editarUsuario";

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const fetchUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch("http://localhost:5000/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const suspenderUsuario = async (id) => {
    try {
      const { error } = await supabase
        .from("usuarios")
        .update({ estado: "suspendido" })
        .eq("id", id);

      if (error) throw error;

      fetchUsuarios();
    } catch (err) {
      console.error("Error al suspender usuario:", err.message);
      alert("Error al suspender usuario");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>

      <button
        onClick={() => setMostrarModal(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
      >
       + Agregar Técnico
      </button>

      {cargando && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!cargando && !error && (
        <>
          <table className="w-full text-left border border-gray-200 shadow-sm rounded overflow-hidden">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="py-3 px-4 border-b">Nombre</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Rol</th>
                <th className="py-3 px-4 border-b">Estado</th>
                <th className="py-3 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="hover:bg-blue-50 transition-all"
                >
                  <td className="py-3 px-4 border-b">{usuario.nombre}</td>
                  <td className="py-3 px-4 border-b">{usuario.email}</td>
                  <td className="py-3 px-4 border-b capitalize">{usuario.rol}</td>
                  <td className="py-3 px-4 border-b capitalize" >{usuario.estado}</td>
                  <td className="py-3 px-4 border-b space-x-2">
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm shadow-sm mr-2"
                      onClick={() => setUsuarioEditando(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow-sm"
                      onClick={() => suspenderUsuario(usuario.id)}
                    >
                      Suspender
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {mostrarModal && (
        <CrearTecnicoModal
          onClose={() => setMostrarModal(false)}
          onUsuarioCreado={fetchUsuarios}
        />
      )}

      {usuarioEditando && (
        <EditarUsuario
          usuario={usuarioEditando}
          onClose={() => setUsuarioEditando(null)}
          onUsuarioActualizado={fetchUsuarios} // coincide con prop en editarUsuario.js
        />
      )}
    </div>
  );
};

export default UsuariosAdmin;
