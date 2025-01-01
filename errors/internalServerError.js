class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 500;
  }
}

export default InternalServerError;
