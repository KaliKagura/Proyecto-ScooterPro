import React, {useState, useEffect} from 'react'
import { productos } from '../productosTest';
import { useDispatch } from 'react-redux';
import { cambiarCantidad } from '../stores/carrito';

const ItemCarrito = (props) => {
    const {prodID, cantidad} = props.data;
    const [producto, setProducto] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const buscarProducto = productos.filter(producto => producto.id === prodID)[0];
        setProducto(buscarProducto);
    }, [prodID])
    const handleMenosCantidad = () => {
        dispatch(cambiarCantidad({
            prodID: prodID,
            cantidad: cantidad - 1
        }));
    }
    const handleMasCantidad = () => {
        dispatch(cambiarCantidad({
            prodID: prodID,
            cantidad: cantidad + 1
        }));
    }
    //console.log(producto);
    return (
        <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md'>
            <img src={producto.img} alt="" className='w-12' />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio * cantidad}</p>
            <div className='w-20 flex justify-between'>
                <button className='bg-gray-200 rounded-full w-6 g-6 text-cyan-600' onClick={handleMenosCantidad}>-</button>
                <span>{cantidad}</span>
                <button className='bg-gray-200 rounded-full w-6 g-6 text-cyan-600' onClick={handleMasCantidad}>+</button>
            </div>
        </div>
    )
}

export default ItemCarrito