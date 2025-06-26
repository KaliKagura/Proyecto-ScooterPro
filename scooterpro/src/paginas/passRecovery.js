import React, { useState } from "react";
import supabase from "../supabase/supabaseClient";

const PassRecovery = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-pass",
    });

    if (error) {
      setError(error.message);
    } else {
      setMensaje(
        "Revisa tu correo para continuar con el cambio de contraseña."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Correo electrónico:
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar enlace
        </button>
      </form>
      {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default PassRecovery;
