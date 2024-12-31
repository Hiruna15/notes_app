const errorHandlere = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, msge: err.message });
  }

  res.json({ error: err });
};

export default errorHandlere;
