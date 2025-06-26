import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// require rutas
import productosRoutes from "./back-routes/productos.js";
import serviciosRoutes from './back-routes/servicios.js';
import carritoRoutes from './back-routes/carrito.js';
import usuariosRoutes from './back-routes/usuarios.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Midd
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.100.7:3000'],
  credentials: true
}));
app.use(express.json());

// rutas
app.use('/productos', productosRoutes);
app.use('/servicios', serviciosRoutes);
app.use('/carrito', carritoRoutes);
app.use('/usuarios', usuariosRoutes);

// main route
app.get("/", (req, res) => {
  res.send("Backend conectado");
});

// Server startup
app.listen(PORT, () => {
  console.log(
    "Servidor en funcionamiento en Host Local: http://localhost:5000/"
  );
});

export default app;