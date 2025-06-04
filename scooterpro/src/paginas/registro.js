import React, { useState } from "react";
import "../paginas/css/registro.css"; // Asegúrate que esta ruta sea correcta
import { signUpUser } from "../supabase/authService";

const Registro = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    telefono: "",
    direccion: "",
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
      setMensaje("Usuario registrado con éxito");
      setError(false);
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
      setError(true);
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
        {mensaje && (
          <p className={`mensaje ${error ? "error" : "exito"}`}>{mensaje}</p>
        )}
      </form>
    </div>
  );
};

export default Registro;
