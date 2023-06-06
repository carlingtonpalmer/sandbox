const request = require("supertest");
const express = require("express");
const router = require("../routes/weaponsRouter");
const weaponRouter = require("../routes/weaponsRouter");

const app = express();
app.use(express.json());
app.use("/", weaponRouter);

describe("Weapons API :- GET /api/weapon - Get all weapons", () => {
  it("Send a GET request to /api/weapon. Verify that the response status code is 200.", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
  });

  // ************** verify this
  it("TEST - Verify that the response body contains an object of weapons.", async () => {
    const response = await request(app).get("/");
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("Weapons API :- GET /api/weapon/:id - Get a only one weapon by its ID", () => {
  const testID = 3;
  it("TEST - Choose an existing weapon ID and send a GET request to and verify that the response status code is 200.", async () => {
    const response = await request(app).get(`/${testID}/maxBuildQuantity`);
    expect(response.statusCode).toEqual(200);
  });

  it("TEST - Verify that the response body contains the weapon object with the specified ID.", async () => {
    const response = await request(app).get(`/${testID}/maxBuildQuantity`);
    expect(response.body.weapon).toHaveProperty("id", testID);
  });

  it("TEST - Enter an invalid weapon ID and send a GET request. Verify that the response status code is 404.", async () => {
    const fid = 130;
    const response = await request(app).get(`/${fid}/maxBuildQuantity`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Weapon with ID ${fid} does not exist`
    );
  });
});
