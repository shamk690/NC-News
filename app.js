const express = require("express");
const apiRouter = require("./routes/api");
const {
  routeNotFound,
  handle500,
  methodNotAllowed,
  handleCustomErrors,
  handlePsqlErrors
} = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handle500);
app.use(methodNotAllowed);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app;
