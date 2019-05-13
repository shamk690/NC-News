const express = require("express");
const apiRouter = require("./routes/api");
const cors = require("cors");
const {
  handleCustomErrors,
  handlePsqlErrors,
  routeNotFound,
  handle500,
  handlePsqlErrors404
} = require("./errors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);
app.use(handleCustomErrors);

app.use(handlePsqlErrors);
app.use(handlePsqlErrors404);
app.use(handle500);

module.exports = app;
