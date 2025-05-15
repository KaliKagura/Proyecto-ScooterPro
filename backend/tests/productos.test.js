import request from "supertest";
import app from "../server.js"; // Asegúrate que este path esté correcto

let createdProductId;

describe("API de Productos", () => {
  // 1. Obtener todos los productos (debería devolver un array, aunque esté vacío)
  it("GET /productos debería devolver un array", async () => {
    const response = await request(app).get("/productos");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 2. Crear un nuevo producto
  it("POST /productos debería crear un nuevo producto", async () => {
    const newProduct = {
      nombre: "Test producto",
      descripcion: "Producto de prueba",
      precio: 19990,
      stock: 20,
      imagen_url: "https://via.placeholder.com/150",
    };

    const response = await request(app).post("/productos").send(newProduct);

    console.log("Respuesta completa del POST:", response.body);

    expect(response.statusCode).toBe(201);
    const productoCreado = Array.isArray(response.body.data)
      ? response.body.data[0]
      : response.body.data;

    expect(productoCreado).toHaveProperty("id");
    createdProductId = productoCreado.id;
  });

  // 3. Obtener un producto por ID
  it("GET /productos/:id debería obtener un producto específico", async () => {
    const response = await request(app).get(`/productos/${createdProductId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", createdProductId);
  });

  // 4. Actualizar un producto
  it("PUT /productos/:id debería actualizar un producto existente", async () => {
    const updatedData = {
      nombre: "Producto actualizado",
      descripcion: "Descripción actualizada",
      precio: 24990,
      stock: 10,
      imagen_url: "https://via.placeholder.com/300",
    };

    const response = await request(app)
      .put(`/productos/${createdProductId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje).toMatch(/actualizado/i);
  });

  // 5. Eliminar un producto
  it("DELETE /productos/:id debería eliminar un producto", async () => {
    const response = await request(app).delete(
      `/productos/${createdProductId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje).toMatch(/eliminado/i);
  });
});
