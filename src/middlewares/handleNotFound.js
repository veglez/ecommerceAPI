const handleNotFound = (req, res) => {
  res.status(404).json({
    message: 'source not found, go to home',
    route: `you tried to acces to ${req.headers.host}${req.url}`,
  });
};

export default handleNotFound;
