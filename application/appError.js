/* eslint-disable require-jsdoc */
class AppErrors extends Error {
  constructor(message, errorCode) {
    super(message);
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppErrors;
