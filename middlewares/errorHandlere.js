import { AppError } from "../errors/index.js";

const errorHandlere = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, msge: err.message });
  }

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msge: err.message });
  }

  res.status(500).json({ success: false, msge: "Internal server error" });
};

export default errorHandlere;
