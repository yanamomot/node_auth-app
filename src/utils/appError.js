class AppError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode || 500;
  }
}

module.exports = AppError;
