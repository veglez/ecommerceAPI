export default function (err, req, res, next) {
  console.log(err);
  const error = err.message || err;
  res
    .status(403)
    .json({ message: 'hubo un error. debuggear middleware', err: error });
}

//posible error.message:
//JWT:
//in case of undefined: jwt must be provided
//jwt malformed
//invalid signature
//jwt expired
