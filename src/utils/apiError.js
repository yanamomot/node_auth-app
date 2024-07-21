class ApiError extends Error {
  constructor({ message, status }) {
    super(message);

    this.status = status || 500;
  }

  static badRequest(message) {
    return new ApiError({
      message,
      status: 400,
    });
  }

  static unauthorized(message) {
    return new ApiError({
      message,
      status: 401,
    });
  }

  static notFound(message) {
    return new ApiError({
      message,
      status: 404,
    });
  }
}

module.exports = ApiError;
