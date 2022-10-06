import { Request, Response } from 'express'
import { AuthController } from '../Controllers/auth.controller'
import { BaseMiddleware } from '../Middleware/base.middleware'
import { HttpResponse } from '../Utils/http.response'
import { BaseRouter } from './base.routes'

export class AuthRouter extends BaseRouter<AuthController, BaseMiddleware> {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {
    super(AuthController, BaseMiddleware)
  }

  routes(): void {
    this.router
      .post('/login', this.middleware.passAuth('login', { session: false }), (req: Request, res: Response) =>
        this.controller.login(req, res)
      )
      .get('/login/google', this.middleware.passAuth('google', { session: false, scope: ['email', 'profile'] }))
      .get(
        '/login/google/callback',
        this.middleware.passAuth('google', {
          session: false,
          // successRedirect: '/login/google/success',
          failureRedirect: '/login/failure',
        }),
        (req, res) => {
          this.controller.login(req, res)
        }
      )
      .get(
        '/login/facebook',
        this.middleware.passAuth('facebook', { session: false, scope: ['email', 'user_location'] })
      )
      .get(
        '/login/facebook/callback',
        this.middleware.passAuth('facebook', { session: false, failureRedirect: '/login/failure' }),
        (req, res) => {
          this.controller.login(req, res)
        }
      )
      .get('/login/failure', (req, res) => {
        this.httpResponse.BadRequest(res, 'Something went wrong.')
      })
  }
}
