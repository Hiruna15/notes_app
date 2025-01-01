class NotFound extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 404;
  }
}

export default NotFound;
