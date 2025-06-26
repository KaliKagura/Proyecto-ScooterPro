import React, { useState } from "react";
import { signUpUser } from "../../supabase/authService";

const CrearTecnicoModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    telefono: "",
    direccion: "",
    rol: "tecnico",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(formData);
      setMensaje("Técnico registrado con éxito");
      setError(false);
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Registrar Técnico</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow w-full"
          >
            Registrar Técnico
          </button>
          {mensaje && (
            <p className={`text-sm ${error ? "text-red-600" : "text-green-600"}`}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CrearTecnicoModal;