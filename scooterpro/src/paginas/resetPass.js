import React, { useState, useEffect } from "react";
import supabase from "../supabase/supabaseClient";

const ResetPass = () => {
  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError("Sesión inválida. Usa el enlace de tu correo nuevamente.");
      }
    };
    getSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (nuevaClave !== confirmarClave) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: nuevaClave,
    });

    if (error) {
      setError(error.message);
    } else {
      setMensaje(
        "Contraseña actualizada correctamente. Ya puedes iniciar sesión."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Nueva contraseña:
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            value={nuevaClave}
            onChange={(e) => setNuevaClave(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2 mt-4">
          Confirmar contraseña:
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            value={confirmarClave}
            onChange={(e) => setConfirmarClave(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Cambiar contraseña
        </button>
      </form>
      {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default ResetPass;
