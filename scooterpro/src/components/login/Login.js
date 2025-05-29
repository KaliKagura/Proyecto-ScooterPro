import React, { useState } from 'react'; //useState para manejar los datazos
import { createClient } from '@supabase/supabase-js'; //conexión supa
import './Login.css';

const supabase = createClient(process.env.REACT_APP_SUPA_URL, process.env.REACT_APP_SUPA_KEY);

export default function Login() { //variables de estado (email, contraseña, error y cargando)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //login real, cuando se manda el formulario se debería ejecutar esto
  const handleLogin = async (e) => { //event donde se envia el formulario y evita la recarga automatica de la pag
    e.preventDefault();
    setLoading(true);
    setError(null);

    //con esta se autentica el usuario y si ta mal avisa
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Inicio de sesión exitoso');
      //aca hay que ver que pasa dsp de que le login sea existoso (si redirecciona, a donde, etc. Pnesaba usar react router)
    }

    setLoading(false);
  };

  return (
    <div className="login-container"> //vistas y demais
      <form className="login-form" onSubmit={handleLogin}> //cuando se presione ingresar o enter ejecutar handleLogin
        <h2>Iniciar Sesión</h2>
        <input
          type="email" //verifica correo valido
          placeholder="Correo electrónico" //correo de ej en gris antes de escribir el correo propio
          value={email} //conecta con el estado email
          onChange={(e) => setEmail(e.target.value)} //cada que se escribe actualiza el estado email de arriba
          required //lo vuelve campo obligatorio
        />
        <input
          type="password" //oculta la contraseña con asteriscos
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required //pues lo mismo de arriba lol
        />
        <button type="submit" disabled={loading}> //envía el form, si loading es true desactiva el botoncito
          {loading ? 'Cargando...' : 'Ingresar'} //texto dinamico no más
        </button>
        {error && <p className="error">{error}</p>}//si tiene algun valor como que esta mala la contra o el correo se muestra
      </form>
    </div>
  );
}