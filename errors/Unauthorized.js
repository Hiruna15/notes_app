import AppError from "./appError.js";

class Unauthorized extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export default Unauthorized;
