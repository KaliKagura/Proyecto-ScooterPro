import imgProd1 from './assets/img/scooter1.webp'
import imgProd2 from './assets/img/scooter2.webp'
import imgRep1 from './assets/img/repuesto1.png'
import imgRep2 from './assets/img/repuesto2.jpg'

export const productos = [
    {
        id: 1,
        nombre: "producto 1",
        precio: 100,
        img: imgProd1,
        descripcion: 'test carrito producto 1',
        slug: 'producto-1',
        tipoProd: 'scooter',
        numTotal: 10
    },
    {
        id: 2,
        nombre: "producto 2",
        precio: 200,
        img: imgProd2,
        descripcion: 'test carrito producto 2',
        slug: 'producto-2',
        tipoProd: 'scooter',
        numTotal: 5
    },
    {
        id: 3,
        nombre: "repuesto 1",
        precio: 150,
        img: imgRep1,
        descripcion: 'test carrito repuesto 1',
        slug: 'repuesto-1',
        tipoProd: 'repuesto',
        numTotal: 2
    },
        {
        id: 4,
        nombre: "repuesto 2",
        precio: 400,
        img: imgRep2,
        descripcion: 'test carrito repuesto 2',
        slug: 'repuesto-2',
        tipoProd: 'repuesto',
        numTotal: 6
    }
]