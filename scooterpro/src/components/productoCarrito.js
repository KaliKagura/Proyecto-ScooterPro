import React from 'react';
import { NavLink } from 'react-router-dom';
import iconoCarrito from '../assets/svg/cart-shopping-solid.svg';
import { useSelector, useDispatch } from 'react-redux';
import { AgregarCarrito } from '../stores/carrito';

const ProductoCarrito = (props) => {
    const carts = useSelector(store => store.cart.items);
    console.log(carts);
    const {id, nombre, precio, img, slug} = props.data;
    const dispatch = useDispatch();
    
    const handleAgregarCarrito = () => {
        dispatch(AgregarCarrito({
            prodID: id,
            cantidad: 1
        }));
    };
    
    return (
        <div className='bg-white p-5 rounded-xl shadow-sm'>
            {/* Ajuste del link para incluir /catalogo */}
            <NavLink to={`/catalogo/${slug}`}>
                <img src={img} alt='' className='w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007' />
            </NavLink>
            <h3 className='text-2xl py-3 text-center font-medium'>{nombre}</h3>
            <div className='flex justify-between items-center'>
                <p>
                    $<span className='text-2xl font-medium'>{precio}</span>
                </p>
                <button className='bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2' onClick={handleAgregarCarrito}>
                    <img src={iconoCarrito} alt="" className='w-5' />
                    Agregar a carrito
                </button>
            </div>
        </div>
    );
};

export default ProductoCarrito;
