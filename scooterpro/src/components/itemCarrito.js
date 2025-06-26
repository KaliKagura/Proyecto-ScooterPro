import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cambiarCantidad } from '../stores/carrito';
import supabase from '../supabase/supabaseClient';

const ItemCarrito = (props) => {
  const { prodID, cantidad, tipoProd } = props.data;
  const [producto, setProducto] = useState(null);
  const [errorStock, setErrorStock] = useState('');
  const dispatch = useDispatch();

  // Cargar información del producto desde Supabase
  useEffect(() => {
    const fetchProducto = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', prodID)
        .eq('tipo_producto', tipoProd)
        .single();

      if (error) {
        console.error('Error al obtener producto desde Supabase:', error);
      } else {
        setProducto(data);
      }
    };

    fetchProducto();
  }, [prodID, tipoProd]);

  const handleMenosCantidad = () => {
    dispatch(cambiarCantidad({
      prodID,
      tipoProd,
      cantidad: cantidad - 1
    }));
  };

  const handleMasCantidad = () => {
    if (producto && cantidad < producto.stock) {
      dispatch(cambiarCantidad({
        prodID,
        tipoProd,
        cantidad: cantidad + 1
      }));
    } else {
      setErrorStock('Stock máximo alcanzado');
      setTimeout(() => setErrorStock(''), 3000);
    }
  };

  if (!producto) return null;

  return (
    <div className='flex flex-col bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-2 rounded-md'>
      <div className='flex justify-between items-center gap-3'>
        <img src={producto.imagen_url} alt={producto.nombre} className='w-12 h-12 object-contain' />
        <h3 className='flex-1'>{producto.nombre}</h3>
        <p>${producto.precio * cantidad}</p>
        <div className='w-20 flex justify-between'>
          <button className='bg-gray-200 rounded-full w-6 text-cyan-600' onClick={handleMenosCantidad}>-</button>
          <span>{cantidad}</span>
          <button className='bg-gray-200 rounded-full w-6 text-cyan-600' onClick={handleMasCantidad}>+</button>
        </div>
      </div>
      {errorStock && (
        <p className="text-red-400 text-sm text-right mr-2">{errorStock}</p>
      )}
    </div>
  );
};

export default ItemCarrito;
