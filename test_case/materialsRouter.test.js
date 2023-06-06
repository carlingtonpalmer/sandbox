const request = require("supertest");
const express = require("express");
const materialsRouter = require("../routes/materialsRouter.js");

const app = express();
app.use(express.json());
app.use("/", materialsRouter);

describe("Material API - Get request/", () => {
  it("TEST - Send a GET request to /api/material. Verify that the response status code is 200.", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
  });
  // ************** verify this
  it("TEST - Verify that the response body contains an object of materials.", async () => {
    const response = await request(app).get("/");
    expect(response.body).toBeInstanceOf(Object);
  });
  it("TEST - Verify if there is an server error status code 500 is return", async () => {
    const response = await request(app).get("/s");
    expect(response.status).toBe(500);
  });
});

describe("Material API :- GET /api/material/:id - Get a only a material by its ID", () => {
  const testID = 1;
  it("TEST - Choose an existing material ID and send a GET request. Verify that the response status code is 200.", async () => {
    const response = await request(app).get(`/${testID}`);
    expect(response.statusCode).toEqual(200);
  });
  it("TEST - Verify that the response body contains the material object with the specified ID.", async () => {
    const response = await request(app).get(`/${testID}`);
    expect(response.body.material).toHaveProperty("id", testID);
    // expect(response.body.material).toHaveProperty("deleted_at");
    // expect(response.body.material).toHaveProperty("power_level");
    // expect(response.body.material).toHaveProperty("qty");
  });
  it("TEST - Choose an invalid material ID and send a GET request. Verify that the response status code is 404.", async () => {
    const fid = 130;
    const response = await request(app).get(`/${fid}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Material with ID ${fid} does not exist`
    );
  });
});

describe("Material API :- PUT /api/material/:id - Update a material by its ID", () => {
  const testID = 1;
  const plevel = 155;
  const qual = 85;
  it("TEST -Choose an existing material ID and send a PUT request and Use a JSON payload with test values to updated material data and have a status code of 200", async () => {
    const updateMaterial = {
      power_level: plevel,
      qty: qual,
      deleted_at: null,
    };
    const response = await request(app).put(`/${testID}`).send(updateMaterial);
    expect(response.statusCode).toEqual(200);
  });
  it("TEST - Verify that the response body contains the updated material object.", async () => {
    const response = await request(app).get(`/${testID}`);
    expect(response.body.material).toHaveProperty("id", testID);
    expect(response.body.material).toHaveProperty("power_level", plevel);
    expect(response.body.material).toHaveProperty("qty", qual);
  });
  it("TEST - Choose an invalid material ID and send a PUT request and verify that the response status code is 404.", async () => {
    const fid = 130;
    const response = await request(app).get(`/${fid}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Material with ID ${fid} does not exist`
    );
  });
});

describe("DELETE /api/material/:id - Delete a material by its ID", () => {
  const testID = 1;
  const plevel = 155;
  const qual = 85;

  it("TEST - Choose an existing material ID and send a DELETE request to and verify that the response status code is 200.", async () => {
    // await request(app).post("/");
    const response = await request(app).get(`/${testID}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.material).toHaveProperty("id", testID);

    const deleteResponse = await request(app).delete(`/${testID}`);
    expect(deleteResponse.statusCode).toEqual(200);
    // *****************************************************************************************
    expect(deleteResponse.body.deletedMaterials[0]).toHaveProperty(
      "id",
      testID
    );

    // const confirmDeleteResponse = await request(app).get(`/${testID}`);
    // expect(confirmDeleteResponse.status).toBe(404);
    // expect(confirmDeleteResponse.body.material).toEqual({});

    // const deletedRecord = response.body.material.power_level;
    // expect(deletedRecord).toBeDefined();
  });

  it("TEST - Verify that the response body does not contains the deleted material object.", async () => {
    const response = await request(app).get(`/${testID}`);
    expect(response.body.material).toHaveProperty("id", testID);
    expect(response.body.material).toHaveProperty("power_level", plevel);
    expect(response.body.material).toHaveProperty("qty", qual);
    const deletedRecord = response.body.material.id;
    expect(deletedRecord).toBeDefined();
  });

  it("TEST - Verify that the response status code is 404.", async () => {
    const fid = 130;
    const response = await request(app).get(`/${fid}`);
    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty(
      "message",
      `Material with ID ${fid} does not exist`
    );
  });
});
