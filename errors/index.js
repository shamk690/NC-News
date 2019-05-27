exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "405 Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  if (err) res.status(400).send({ msg: "400: Bad Request" });
  //res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};
exports.handlePsqlErrors404 = (err, req, res, next) => {
  console.log("errorr", err);
  const codes = ["23503"];
  if (codes.includes(err.code)) res.status(404).send({ msg: "404: Not Found" });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const codes = ["22P02"];
  if (codes.includes(err.code))
    res
      .status(400)
      .send({ msg: "Bad Request, invalid input syntax for integer" });
  else next(err);
};
