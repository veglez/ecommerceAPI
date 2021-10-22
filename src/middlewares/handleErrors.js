export default function (err, req, res, next) {
  const error = err.message || err;
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(403)
    .json({ message: 'hubo un error. debuggear middleware', err: error })
    .end();
}

//posible error.message:
//JWT:
//in case of undefined: jwt must be provided
//jwt malformed
//invalid signature
//jwt expired
