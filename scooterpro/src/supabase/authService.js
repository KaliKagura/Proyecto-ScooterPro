import { supabase } from './supabaseClient';

export const signUpUser = async ({ email, password, nombre, rol, telefono, direccion }) => {
  // Paso 1: Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  const userId = authData.user.id;

  // Paso 2: Crear perfil en la tabla usuarios
  const { error: insertError } = await supabase.from('usuarios').insert([
    {
      id: userId,
      nombre,
      rol,
      telefono,
      direccion,
    },
  ]);

  if (insertError) throw insertError;

  return userId;
};