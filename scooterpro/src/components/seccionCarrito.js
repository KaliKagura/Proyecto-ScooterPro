import { useSelector, useDispatch } from 'react-redux';
import ItemCarrito from './itemCarrito';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleStatusSC, clearCart } from '../stores/carrito';

const SeccionCarrito = () => {
  const carts = useSelector(store => store.cart.items);
  const statusSC = useSelector(store => store.cart.statusSC);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = statusSC ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [statusSC]);

  const handleCerrarCarrito = () => {
    dispatch(toggleStatusSC());
  };

  const handleComprar = () => {
    handleCerrarCarrito();
    navigate('/compra');
  };

  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_auto]
      transform transition-transform duration-500
      ${statusSC === false ? 'translate-x-full' : ''}`}
    >
      <h2 className='p-3 text-white text-2xl'>Carrito de compras</h2>

      <div className='p-2 overflow-y-auto'>
        {carts.length > 0 ? (
          carts.map((item, key) => <ItemCarrito key={key} data={item} />)
        ) : (
          <p className='text-white text-center mt-4'>Tu carrito está vacío.</p>
        )}
      </div>

      <div className='flex flex-col gap-2 px-4 pb-4'>
        {carts.length > 0 && (
          <button className='bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition' onClick={handleVaciarCarrito}>Vaciar carrito</button>
        )}

        <div className='grid grid-cols-2 gap-2'>
          <button className='bg-black text-white py-2 rounded-md hover:bg-gray-800 transition' onClick={handleCerrarCarrito}>Cerrar</button>
          <button className='bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition' onClick={handleComprar} disabled={carts.length === 0}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default SeccionCarrito;
