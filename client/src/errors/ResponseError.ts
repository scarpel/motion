export default class ResponseError extends Error {
  statusCode;
  body;

  constructor(message: string, statusCode: number, body: any) {
    super(message);

    this.name = "ResponseError";
    this.statusCode = statusCode;
    this.body = body;
  }
}
