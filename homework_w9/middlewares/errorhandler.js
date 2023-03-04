function errorHandler(err, req, res, next) {
  if (err.name === 'ErrorNotFound') {
    res.status(404).json({
      message: 'Error Not Found',
    });
  } else if (err.name === 'InvalidPassword') {
    res.status(400).json({
      message: 'Invalid password',
    });
  } else if (err.name === 'Unauthenticated') {
    res.status(400).json({
      message: 'Unauthenticated',
    });
  } else if (err.name === 'JwtError') {
    res.status(400).json({
      message: 'Jwt Error',
    });
  } else if (err.name === 'Unauthorized') {
    res.status(401).json({
      message: 'Unauthorized',
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

module.exports = errorHandler;
