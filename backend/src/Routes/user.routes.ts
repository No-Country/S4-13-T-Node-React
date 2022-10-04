import { UserController } from '../Controllers/user.controller'
import { UserMiddleware } from '../Middleware/user.middleware'
import { BaseRouter } from './base.routes'

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware)
  }

  routes(): void {
    this.router
      .route('/user')
      .post((req, res) => {
        this.controller.createUser(req, res)
      })
      .get((req, res) => {
        this.controller.getUsers(req, res)
      })

    this.router
      .route('/user/:id')
      .get((req, res) => {
        this.controller.getUser(req, res)
      })
      .put((req, res) => {
        this.controller.updateUser(req, res)
      })
      .delete((req, res) => {
        this.controller.removeUser(req, res)
      })

    this.router.route('/user/:id/likes').get((req, res) => {
      this.controller.getUserWithLikes(req, res)
    })

    this.router.route('/user/:id/favorites').get((req, res) => {
      this.controller.getUserWithFavorites(req, res)
    })
  }
}
