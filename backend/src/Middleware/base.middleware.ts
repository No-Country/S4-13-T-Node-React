import HttpResponse from '../Utils/http.response'

export class BaseMiddleware {
  constructor(public httpResponse: typeof HttpResponse = HttpResponse) {}
}
