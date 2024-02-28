module.exports = (err, req, res, next) => {
  res.status(500).json({
    status: err.status,
    message: err.message,
  });
};
