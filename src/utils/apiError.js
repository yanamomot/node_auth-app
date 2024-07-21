class ApiError extends Error {
  constructor({ message, status, errors = {} }) {
    super(message);

    this.status = status || 500;
    this.errors = errors;
  }

  static badRequest(message, errors) {
    return new ApiError({
      message,
      status: 400,
      errors,
    });
  }

  static unauthorized(errors) {
    return new ApiError({
      message: 'Unauthorized user',
      status: 401,
      errors,
    });
  }

  static notFound(message, errors) {
    return new ApiError({
      message,
      status: 404,
      errors,
    });
  }
}

module.exports = ApiError;
