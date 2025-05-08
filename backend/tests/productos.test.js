import request from "supertest";
import express from "express";
import productosRoutes from "../back-routes/productos.js";

const app = express();
app.use(express.json());
app.use("/productos", productosRoutes);

describe("API de Productos", () => {
  test("GET /productos debería devolver un array", async () => {
    const response = await request(app).get("/productos");
    console.log("Respuesta completa:", response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
