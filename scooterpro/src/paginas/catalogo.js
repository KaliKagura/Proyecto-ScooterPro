import React from 'react'
import { productos } from '../productosTest'
import ProductoCarrito from '../components/productoCarrito'

const Catalogo= () => {
    return (
        <div>
            <h1 className='text-3xl my-5'>Lista productos</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                {productos.map((producto, key) =>
                    <ProductoCarrito key={key} data={producto}/>
                )}
            </div>

        </div>
    )
}

export default Catalogo