import request from "supertest";
import app from "../server.js";

describe("API de Servicios", () => {
  let createdServicioId;

  const nuevoServicio = {
    fecha: "2024-05-15T10:00:00.000Z",
    tipo_servicio: "Revisión general",
    cliente_id: "SUSTITUIR_POR_ID_VALIDO",
    marca_scooter: "Xiaomi",
    modelo_scooter: "M365",
    descripcion: "Revisión completa del sistema eléctrico",
  };

  it("POST /servicios debería agendar un nuevo servicio", async () => {
    const response = await request(app).post("/servicios").send(nuevoServicio);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "mensaje",
      "Servicio agendado correctamente"
    );
    createdServicioId = response.body.data[0].id;
  });

  it("GET /servicios debería devolver todos los servicios", async () => {
    const response = await request(app).get("/servicios");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("PUT /servicios/:id/estado debería actualizar el estado del servicio", async () => {
    const response = await request(app)
      .put(`/servicios/${createdServicioId}/estado`)
      .send({ estado: "completado" });
    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje).toMatch(/actualizado/i);
  });
});
