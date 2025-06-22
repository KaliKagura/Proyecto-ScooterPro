import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../stores/carrito';

const Compra = () => {
    const carrito = useSelector(state => state.cart.items);
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [etapa, setEtapa] = useState('entrega');
    const [metodoEntrega, setMetodoEntrega] = useState('');
    const [direccion, setDireccion] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [boleta, setBoleta] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const cargarDatos = async () => {
            const datos = [];
            let totalTemp = 0;

            for (const item of carrito) {
                const { data } = await supabase
                    .from('productos')
                    .select('*')
                    .eq('id', item.prodID)
                    .eq('tipo_producto', item.tipoProd)
                    .single();

                if (data) {
                    datos.push({ ...data, cantidad: item.cantidad });
                    totalTemp += item.cantidad * data.precio;
                }
            }

            setProductos(datos);
            setTotal(totalTemp);
        };

        cargarDatos();
    }, [carrito]);

    // Redirige al catálogo después de mostrar el resumen
    useEffect(() => {
        if (etapa === 'resumen') {
            const timer = setTimeout(() => {
                navigate('/catalogo');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [etapa, navigate]);

    const handleConfirmarEntrega = () => {
        if (metodoEntrega === 'retiro' || (metodoEntrega === 'envio' && direccion.trim() !== '')) {
            setEtapa('pago');
        } else {
            alert('Completa los datos requeridos del método de entrega.');
        }
    };

    const handleConfirmarPago = async () => {
        for (const prod of productos) {
            const nuevoStock = prod.stock - prod.cantidad;

            await supabase
                .from('productos')
                .update({ stock: nuevoStock })
                .eq('id', prod.id)
                .eq('tipo_producto', prod.tipo_producto);
        }

        const nuevaBoleta = {
            productos: productos.map(p => ({
                nombre: p.nombre,
                cantidad: p.cantidad,
                precio: p.precio
            })),
            total_pago: total,
            metodo_entrega: metodoEntrega,
            direccion: metodoEntrega === 'envio' ? direccion : 'Retiro en tienda',
            metodo_pago: tarjeta ? 'Tarjeta' : 'Efectivo',
            tarjeta: tarjeta ? { numero: tarjeta.slice(-4) } : null,
        };

        await supabase.from('boletas').insert([nuevaBoleta]);

        console.log('🧾 Boleta generada:', nuevaBoleta);
        if (tarjeta) console.log('💳 Datos de tarjeta guardados para billetera:', tarjeta);

        dispatch(clearCart());
        setBoleta(nuevaBoleta);
        setEtapa('resumen');
    };

    const handleCancelar = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-[1200px] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Panel izquierdo */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Tu Carrito</h2>
                {productos.map((p, i) => (
                    <div key={i} className="mb-2 border-b pb-2">
                        <p>{p.nombre} x{p.cantidad} = ${p.precio * p.cantidad}</p>
                    </div>
                ))}
                <p className="mt-4 font-bold text-lg">Total: ${total}</p>
                <button onClick={handleCancelar} className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Cancelar compra</button>
            </div>

            {/* Panel derecho */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {etapa === 'entrega' && (
                    <>
                        <h2 className="text-xl font-bold mb-4">Método de Entrega</h2>
                        <select
                            value={metodoEntrega}
                            onChange={e => setMetodoEntrega(e.target.value)}
                            className="w-full mb-4 p-2 border rounded"
                        >
                            <option value="">Selecciona...</option>
                            <option value="retiro">Retiro en tienda</option>
                            <option value="envio">Envío a domicilio</option>
                        </select>
                        {metodoEntrega === 'envio' && (
                            <input
                                type="text"
                                placeholder="Dirección de envío"
                                value={direccion}
                                onChange={e => setDireccion(e.target.value)}
                                className="w-full mb-4 p-2 border rounded"
                            />
                        )}
                        <button onClick={handleConfirmarEntrega} className="bg-blue-600 text-white px-4 py-2 rounded">Continuar</button>
                    </>
                )}

                {etapa === 'pago' && (
                    <>
                        <h2 className="text-xl font-bold mb-4">Método de Pago</h2>
                        <label className="block mb-2">
                            <input type="radio" name="pago" value="tarjeta" onChange={() => setTarjeta('')} />
                            Tarjeta
                        </label>
                        <label className="block mb-4">
                            <input type="radio" name="pago" value="efectivo" onChange={() => setTarjeta(null)} />
                            Efectivo
                        </label>

                        {tarjeta !== null && (
                            <input
                                type="text"
                                placeholder="Número de tarjeta"
                                value={tarjeta}
                                onChange={e => setTarjeta(e.target.value)}
                                className="w-full mb-4 p-2 border rounded"
                            />
                        )}

                        <button onClick={handleConfirmarPago} className="bg-green-600 text-white px-4 py-2 rounded">Finalizar Compra</button>
                    </>
                )}

                {etapa === 'resumen' && (
                    <>
                        <h2 className="text-xl font-bold mb-4">¡Gracias por tu compra!</h2>
                        <p>Tu boleta ha sido generada y enviada a tu correo.</p>
                        <pre className="bg-gray-100 p-3 mt-4 text-sm overflow-x-auto max-h-60">{JSON.stringify(boleta, null, 2)}</pre>
                        <p className="text-sm text-gray-500 mt-2">Serás redirigido al catálogo en unos segundos...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Compra;
