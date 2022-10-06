import { NextFunction, Request, Response } from 'express'
import { AuthController } from '../Controllers/auth.controller'
import { BaseMiddleware } from '../Middleware/base.middleware'
import { HttpResponse } from '../Utils/http.response'
import { BaseRouter } from './base.routes'

export class AuthRouter extends BaseRouter<AuthController, BaseMiddleware> {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {
    super(AuthController, BaseMiddleware)
  }

  routes(): void {
    this.router.post('/login', this.middleware.passAuth('login'), (req: Request, res: Response) =>
      this.controller.login(req, res)
    )
  }
}
