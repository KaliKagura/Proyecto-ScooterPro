import React, { useState } from 'react';
import { signUpUser } from '../supabase/authService';

const Registro = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    rol: '',
    telefono: '',
    direccion: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(formData);
      setMensaje('Usuario registrado con éxito');
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <input name="nombre" type="text" placeholder="Nombre" onChange={handleChange} required />
        <input name="rol" type="text" placeholder="Rol (admin/cliente)" onChange={handleChange} required />
        <input name="telefono" type="text" placeholder="Teléfono" onChange={handleChange} required />
        <input name="direccion" type="text" placeholder="Dirección" onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Registrarse</button>
      </form>
      {mensaje && <p className="mt-4">{mensaje}</p>}
    </div>
  );
};

export default Registro;