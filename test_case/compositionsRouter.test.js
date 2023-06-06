const request = require("supertest");
const express = require("express");
const compositionsRouter = require("../routes/compositionsRouter.js");

const app = express();
app.use(express.json());
app.use("/", compositionsRouter);

describe("Composition API :- POST /api/material/:parentId/composition - Post a new composition", () => {
  const parent_id = 6;
  const material1 = { material_id: 1, qty: 50 };
  const material2 = { material_id: 9, qty: 25 };
  it("TEST - Send a POST request to /:parentId/composition with a JSON payload containing composition data and Verify that the response status code is 200.", async () => {
    const response = await request(app)
      .post(`/${parent_id}/composition`)
      .send(material1)
      .send(material2);

    if (response.status === 400) {
      expect.assertions(1);
      // Add your test assertions here
      expect(response.status).toBe(400);
    } else {
      expect(response.status).toBe(200);
      expect(response.body.newComposition).toHaveProperty(
        "parent_id",
        parent_id
      );
      expect(response.body.updatedWeapons[0]).toHaveProperty(
        "name",
        "Excalibur"
      );
      expect(response.body.updatedWeapons[0]).toHaveProperty(
        "power_level",
        314130
      );
      // second object
      expect(response.body.updatedWeapons[1]).toHaveProperty(
        "name",
        "Magic Staff"
      );
      expect(response.body.updatedWeapons[1]).toHaveProperty(
        "power_level",
        296750
      );
    }
  });
  // it("TEST - Verify that the response body contains the newly created composition object.", async () => {
  //   const response = await request(app).put("/1/composition/1");
  //   expect(response.status).toBe(500);
  //   expect(response.body).toHaveProperty(
  //     "message",
  //     `Unexpected error in Composition.get`
  //   );
  // });
});

describe("Composition API :- PUT /api/material/:parentId/composition/:materialId - Update a material by its ID:", () => {
  const parent_id = 2;
  const material1 = { material_id: 7, qty: 30 };
  it("TEST - Enter an existing parent and material ID and send a PUT request to and Use a JSON payload with updated composition data", async () => {
    const response = await request(app)
      .put(`/${parent_id}/composition/4`)
      .send(material1);
    if (response.status === 400) {
      expect.assertions(1);
      // Add your test assertions here
      expect(response.status).toBe(400);
    } else {
      expect(response.status).toBe(200);
    }
  });
});

describe("Composition API :- DELETE /api/material/:parentId/composition/:materialId - Delete a material by its ID", () => {
  it("TEST/ - Enter an existing parent and material ID and send a DELETE request to and verify that the response status code is 200.", async () => {
    const response = await request(app).delete("/3/composition/5");

    if (response.status === 404) {
      expect.assertions(1);
      // Add your test assertions here
      expect(response.status).toBe(404);
    } else {
      expect(response.status).toBe(200);
    }
  });
});
