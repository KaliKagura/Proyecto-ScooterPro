import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AgregarCarrito } from '../stores/carrito';
import { supabase } from '../supabase/supabaseClient';

const Producto = () => {
    const { slug } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [errorStock, setErrorStock] = useState('');
    const dispatch = useDispatch();
    const carrito = useSelector(state => state.cart.items);

    // Buscar producto por slug desde Supabase
    useEffect(() => {
        const fetchProducto = async () => {
            const { data, error } = await supabase
                .from('productos')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !data) {
                window.location.href = '/catalogo';
            } else {
                setProducto(data);
            }
        };

        fetchProducto();
    }, [slug]);

    const handleMenosCantidad = () => {
        setCantidad(Math.max(1, cantidad - 1));
        setErrorStock('');
    };

    const handleMasCantidad = () => {
        if (producto && cantidad < producto.stock) {
            setCantidad(cantidad + 1);
            setErrorStock('');
        } else {
            setErrorStock('Stock máximo alcanzado');
        }
    };

    const handleAgregarCarrito = () => {
        const enCarrito = carrito.find(item => item.prodID === producto.id && item.tipoProd === producto.tipo_producto);
        const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
        const totalDeseado = cantidadEnCarrito + cantidad;

        if (producto.stock > 0 && totalDeseado <= producto.stock) {
            dispatch(
                AgregarCarrito({
                    prodID: producto.id,
                    tipoProd: producto.tipo_producto,
                    cantidad: cantidad,
                })
            );
            setErrorStock('');
        } else {
            setErrorStock(`No puedes agregar más del stock disponible (${producto.stock})`);
        }
    };

    if (!producto) {
        return <div className="ml-5 text-gray-500">Cargando producto...</div>;
    }

    return (
        <div className="max-w-[1500px] mx-auto px-1 py-2">
            <h2 className="text-3xl mb-8">Detalles del Producto</h2>
            <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-shrink-0 max-w-sm w-full">
                    <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="w-full h-100 rounded-lg object-contain"
                    />
                </div>

                <div className="flex flex-col gap-3 flex-grow">
                    <h1 className="text-4xl uppercase font-bold text-left">{producto.nombre}</h1>
                    <p className="text-2xl uppercase text-gray-500 font-bold italic text-left">{producto.marca}</p>
                    <p className="font-bold text-3xl text-left">${producto.precio}</p>

                    <div className="flex gap-3">
                        <div className="flex gap-2 items-center">
                            <button className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center" onClick={handleMenosCantidad} disabled={cantidad === 1}>-</button>
                            <span className="bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                                {cantidad}
                            </span>
                            <button className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center" onClick={handleMasCantidad} disabled={cantidad >= producto.stock}>+</button>
                        </div>
                        <button className={`px-7 py-3 rounded-xl shadow-2xl ${producto.stock > 0
                                ? 'bg-slate-900 text-white'
                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            }`}
                            onClick={handleAgregarCarrito} disabled={producto.stock <= 0}>{producto.stock > 0 ? 'Agregar a carrito' : 'Sin stock'}</button>
                    </div>

                    {/* Mensaje de error si se supera el stock disponible */}
                    {errorStock && (
                        <p className="text-red-500 font-semibold text-sm">{errorStock}</p>
                    )}

                    <p className="text-2xl text-gray-600 text-left">Stock disponible: {producto.stock}</p>
                    <h3 className="text-lg font-semibold mt-2 text-left">Descripción</h3>
                    <p className="text-left text2xl">{producto.descripcion}</p>
                </div>
            </div>
        </div>
    );
};

export default Producto;
