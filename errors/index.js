exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const codes = ["22P02"];
  // console.log(err.message);

  if (codes.includes(err.code))
    res
      .status(400)
      .send({ msg: "Bad Request, invalid input syntax for integer" });
  else next(err);
};

// 23502: "violates not null violation",
// "22P02": "invalid input syntax for integer"
