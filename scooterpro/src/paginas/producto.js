import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productos } from '../productosTest';
import { useDispatch } from 'react-redux';
import { AgregarCarrito } from '../stores/carrito';

const Producto = () => {
    const { slug } = useParams();
    const [producto, setProducto] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const buscarProducto = productos.find(producto => producto.slug === slug);
        if (buscarProducto) {
            setProducto(buscarProducto);
        } else {
            window.location.href = '/catalogo';
        }
    }, [slug]);

    const handleMenosCantidad = () => {
        setCantidad(Math.max(1, cantidad - 1));
    };

    const handleMasCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const handleAgregarCarrito = () => {
        console.log("Agregando al carrito:", producto.id, cantidad);
        dispatch(AgregarCarrito({
            prodID: producto.id,
            cantidad: cantidad
        }));
    };

    return (
        <div className='ml-5'>
            <h2 className='text-3xl mb-8'>Detalles del Producto</h2>
            <div className='flex flex-col md:flex-row gap-10 items-start'>
                {/* Imagen del producto */}
                <div className='flex-shrink-0 max-w-sm w-full'>
                    <img src={producto.img} alt={producto.nombre} className='w-full rounded-lg shadow-md object-contain' />
                </div>

                {/* Detalles del producto */}
                <div className='flex flex-col gap-5 flex-grow'>
                    <h1 className='text-4xl uppercase font-bold text-left'>{producto.nombre}</h1>
                    <p className='font-bold text-3xl text-left'>
                        ${producto.precio}
                    </p>
                    <p className='text-left'>
                        {producto.descripcion}
                    </p>
                    <div className='flex gap-5'>
                        <div className='flex gap-2 items-center'>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMenosCantidad}>-</button>
                            <span className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{cantidad}</span>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMasCantidad}>+</button>
                        </div>
                        <button className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl' onClick={handleAgregarCarrito}>
                            Agregar a carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Producto;
