const express = require("express");
const server = express();

const cors = require("cors");

const weaponsRouter = require("./routes/weaponsRouter");
const materialsRouter = require("./routes/materialsRouter");
const compositionsRouter = require("./routes/compositionsRouter");

// Middleware
server.use(cors());
server.use(express.json());

// Routers
server.use("/api/weapon", weaponsRouter);
server.use("/api/material", materialsRouter);
//this route should be `/api/material/:materialId/composition` but :materialId does not show up in the params
server.use("/api/material", compositionsRouter);

//Routes
server.get("/", (req, res) => {
  res.status(200).send("Vention Quest");
});

module.exports = server;
