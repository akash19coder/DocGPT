class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.stack = stack;
  }
}
export { ApiError };
