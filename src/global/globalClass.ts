export class ResponseData<D> {
  data: D | D[];
  statusCode?: number;
  message?: string;

  constructor(data: D | D[], statusCode?: number, message?: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;

    return this;
  }

  getResponse() {
    const responseData = {
      result: this.data,
      statusCode: this.statusCode,
      message: this.message,
    };
    return responseData;
  }

  getResponseLogin() {
    return Object.assign({}, this.data, {
      message: this.message,
      statusCode: this.statusCode,
    });
  }
}
