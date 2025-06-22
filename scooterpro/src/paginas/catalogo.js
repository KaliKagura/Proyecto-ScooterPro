import React, { useState, useEffect } from 'react';
import ProductoCarrito from '../components/productoCarrito'
import { supabase } from '../supabase/supabaseClient.js'


const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from('productos').select('*');
      if (error) console.error('Error al obtener productos:', error);
      else setProductos(data);
    };

    fetchProductos();
  }, []);

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <h1 className="text-2xl mb-8 text-center">Lista de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {productos.map((producto, key) => (
          <ProductoCarrito key={key} data={producto} />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;