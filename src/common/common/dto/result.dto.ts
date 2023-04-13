export class Result<T> {

  code: number;

  message: string;

  data: T;

  ok(data = null, message = 'success') {
    this.code = 0;
    this.data = data;
    this.message = message;
    return this;
  }

  error(code = 1, message = 'error') {
    this.code = code;
    this.message = message;
    return this;
  }
}
