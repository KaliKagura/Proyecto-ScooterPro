import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ItemCarrito from './itemCarrito';
import { toggleStatusSC } from '../stores/carrito';

const SeccionCarrito = () => {
    const carts = useSelector(store => store.cart.items);
    const statusSC = useSelector(store => store.cart.statusSC);
    const dispatch = useDispatch();
    const handleCerrarCarrito = () => {
        dispatch(toggleStatusSC());
    }
    return (
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px]
            transform transition-transform duration-500
            ${statusSC === false ? "translate-x-full" : ""}`}>
            <h2 className='p-5 text-white text-2xl'>Carrito de compras</h2>
            <div className='p-5'>
                {carts.map((item,key) =>
                    <ItemCarrito key={key} data={item}/>
                )}
            </div>
            <div className='grid grid-cols-2'>
                <button className='bf-black text-white' onClick={handleCerrarCarrito}>Cerrar</button>
                <button className='bg-amber-600 text-white'>Checkout</button>
            </div>
        </div>
    )
}

export default SeccionCarrito