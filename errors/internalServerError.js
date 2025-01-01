import AppError from "./appError.js";

class InternalServerError extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

export default InternalServerError;
