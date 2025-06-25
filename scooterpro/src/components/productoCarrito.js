import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgregarCarrito } from '../stores/carrito';
import iconoCarrito from '../assets/svg/cart-shopping-solid.svg';
import { NavLink } from 'react-router-dom';
import './catalogo/Catalogo.css';

const ProductoCarrito = ({ data }) => {
  const {
    id,
    nombre,
    precio,
    imagen_url,
    slug,
    tipo_producto,
    marca,
    stock,
  } = data;

  const dispatch = useDispatch();
  const carrito = useSelector(state => state.cart.items);
  const [errorStock, setErrorStock] = useState('');

  const handleAgregarCarrito = () => {
    const itemCarrito = carrito.find(
      item => item.prodID === id && item.tipoProd === tipo_producto
    );

    const cantidadEnCarrito = itemCarrito ? itemCarrito.cantidad : 0;

    if (cantidadEnCarrito + 1 > stock) {
      setErrorStock('No hay suficiente stock disponible.');
      setTimeout(() => setErrorStock(''), 3000);
    } else {
      dispatch(
        AgregarCarrito({
          prodID: id,
          tipoProd: tipo_producto,
          cantidad: 1,
        })
      );
    }
  };

  return (
    <div className="producto-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-between h-full transition-transform hover:scale-105">
      <NavLink to={`/catalogo/${slug}`} className="w-full">
        <img src={imagen_url} alt={nombre} className="w-full max-h-40 object-contain rounded-md mb-4" />
      </NavLink>

      <h3 className="text-xl font-semibold text-center mb-2">{nombre}</h3>
      <p className="text-gray-500 text-sm mb-2">{marca}</p>

      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-bold text-gray-700">${precio}</p>

        {stock > 0 ? (
          <button className="bg-[#d9d9d9] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#545454] transition-colors hover:text-white"
            onClick={handleAgregarCarrito}>
            <img src={iconoCarrito} alt="Carrito" className="w-5" />Agregar</button>
        ) : (
          <span className="text-red-500 font-semibold text-sm">Sin stock</span>
        )}
      </div>

      {errorStock && (
        <p className="text-sm text-red-500 mt-2">{errorStock}</p>
      )}
    </div>
  );
};

export default ProductoCarrito;
