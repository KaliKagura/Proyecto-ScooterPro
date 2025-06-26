import React, { useState, useEffect } from "react";

const EditarUsuario = ({ usuario, onClose, onUsuarioActualizado }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "");
      setEmail(usuario.email || "");
      setRol(usuario.rol || "");
      setEstado(usuario.estado || "activo");
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/usuarios/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, rol, estado }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al actualizar usuario");

      onUsuarioActualizado();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </label>

          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </label>

          <label className="block mb-2">
            Rol:
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="tecnico">Técnico</option>
              <option value="cliente">Cliente</option>
            </select>
          </label>

          <label className="block mb-4">
            Estado:
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            >
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
              <option value="eliminado">Eliminado</option>
            </select>
          </label>

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuario;