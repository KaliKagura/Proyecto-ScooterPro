import React from 'react';
import { NavLink } from 'react-router-dom';
import iconoCarrito from '../assets/svg/cart-shopping-solid.svg';
import { useDispatch } from 'react-redux';
import { AgregarCarrito } from '../stores/carrito';
import './catalogo/Catalogo.css';

const ProductoCarrito = ({ data }) => {
    const { id, nombre, precio, img, slug } = data;
    const dispatch = useDispatch();

    const handleAgregarCarrito = () => {
        dispatch(AgregarCarrito({
            prodID: id,
            cantidad: 1
        }));
    };

    return (
        <div className="producto-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
            <NavLink to={`/catalogo/${slug}`} className="w-full">
                <img src={img} alt={nombre} className="producto-img mb-4" />
            </NavLink>
            <h3 className="text-xl font-semibold text-center mb-2">{nombre}</h3>
            <div className="flex justify-between items-center w-full">
                <p className="text-lg font-bold text-gray-700">${precio}</p>
                <button
                    className="bg-[#d9d9d9] text-Black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#545454] transition-colors hover:text-white"
                    onClick={handleAgregarCarrito}
                >
                    <img src={iconoCarrito} alt="Carrito" className="w-5" />
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default ProductoCarrito;