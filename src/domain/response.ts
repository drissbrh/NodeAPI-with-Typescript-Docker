import { Code } from "../enum/code.enum";

export class HttpResponse {
  private timeStamp: string;
  constructor(
    private statusCode: Code,
    private httpStatus: string,
    private message: string,
    private data?: {}
  ) {
    this.timeStamp = new Date().toLocaleDateString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}
