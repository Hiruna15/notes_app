import AppError from "./appError.js";

class NotFound extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFound;
