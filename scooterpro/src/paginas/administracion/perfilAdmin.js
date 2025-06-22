import { useState } from 'react';
import HistorialCompras from './historialCompras';
import CrearProducto from './crearProducto';
import ListarProductos from './listarProductos';
import Inventario from './inventario';
import testAdmin from '../../assets/img/empresario.jpg';

const PerfilAdmin = () => {
  const [vistaActual, setVistaActual] = useState('bienvenida');

  const renderVista = () => {
    switch (vistaActual) {
      case 'listar-productos':
        return <ListarProductos />;
      case 'crear-producto':
        return <CrearProducto />;
      case 'historial-inventario':
        return <Inventario />;
      case 'historial-pagos':
        return <HistorialCompras />;
      default:
        return <p className="text-xl p-4">Selecciona una opción del menú.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Panel Izquierdo */}
      <div className="w-64 bg-orange-800 text-white p-6 flex flex-col">
        <div className="mb-6 text-center">
          <img
            src={testAdmin}
            alt="admin"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
          />
          <h2 className="text-lg font-semibold">Bienvenido, Admin</h2>
        </div>

        {/* Menú */}
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-bold mb-1">Catálogo</p>
            <button onClick={() => setVistaActual('listar-productos')} className="text-left px-4 py-2 hover:bg-slate-700 rounded">
              Listar productos
            </button>
            <button onClick={() => setVistaActual('crear-producto')} className="text-left px-4 py-2 hover:bg-slate-700 rounded">
              Crear producto
            </button>
          </div>

          <div>
            <p className="font-bold mt-4 mb-1">Usuarios</p>
            <button className="text-left px-4 py-2 rounded text-gray-400 cursor-not-allowed">
              Listar usuarios
            </button>
            <button className="text-left px-4 py-2 rounded text-gray-400 cursor-not-allowed">
              Crear usuario
            </button>
          </div>

          <div>
            <p className="font-bold mt-4 mb-1">Pagos</p>
            <button onClick={() => setVistaActual('historial-pagos')} className="text-left px-4 py-2 hover:bg-slate-700 rounded">
              Historial pagos
            </button>
          </div>

          <div>
            <p className="font-bold mt-4 mb-1">Inventario</p>
            <button onClick={() => setVistaActual('historial-inventario')} className="text-left px-4 py-2 hover:bg-slate-700 rounded">
              Historial inventario
            </button>
          </div>

          <div>
            <p className="font-bold mt-4 mb-1">Servicios Técnicos</p>
            <button className="text-left px-4 py-2 rounded text-gray-400 cursor-not-allowed">
              Listar servicios
            </button>
            <button className="text-left px-4 py-2 rounded text-gray-400 cursor-not-allowed">
              Crear servicio
            </button>
          </div>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="flex-grow bg-gray-100 p-6 overflow-y-auto">
        {renderVista()}
      </div>
    </div>
  );
};

export default PerfilAdmin;
