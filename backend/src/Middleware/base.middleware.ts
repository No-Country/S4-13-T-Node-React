import { HttpResponse } from '../Utils/http.response'

export class BaseMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
}
