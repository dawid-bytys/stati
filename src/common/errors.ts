export abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract statusCode: number;
}

export class InvalidSpdcCookieError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Invalid sp_dc cookie.');
    Object.setPrototypeOf(this, InvalidSpdcCookieError.prototype);
  }
}

export class TooManyRequestsError extends CustomError {
  statusCode = 429;

  constructor() {
    super('Hey, please slow down...');
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

export class ServiceUnavailableError extends CustomError {
  statusCode = 503;

  constructor() {
    super('Service is currently unavailable.');
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}
