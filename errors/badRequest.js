import AppError from "./appError.js";

class BadRequest extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequest;
