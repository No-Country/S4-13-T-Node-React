import { UserController } from '../Controllers/user.controller'
import { UserMiddleware } from '../Middleware/user.middleware'
import { BaseRouter } from './base.routes'

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware)
  }

  routes(): void {
    this.router.post(
      '/register',
      (req, res, next) => this.middleware.registerValidator(req, res, next),
      (req, res) => this.controller.createUser(req, res)
    )

    this.router.route('/user').get(
      this.middleware.passAuth('jwt'),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => {
        this.controller.getUsers(req, res)
      }
    )

    this.router
      .route('/user/:id')
      .get((req, res) => {
        this.controller.getUser(req, res)
      })
      .put(
        this.middleware.passAuth('jwt'),
        (req, res, next) => this.middleware.checkUserIsUserOwner(req, res, next),
        (req, res, next) => this.middleware.updateValidator(req, res, next),
        (req, res) => {
          this.controller.updateUser(req, res)
        }
      )
      .delete(
        this.middleware.passAuth('jwt'),
        (req, res, next) => this.middleware.checkUserIsUserOwner(req, res, next),
        (req, res) => {
          this.controller.removeUser(req, res)
        }
      )

    this.router.route('/user/:id/posts').get((req, res) => {
      this.controller.getUserWithPosts(req, res)
    })

    this.router.route('/user/:id/likes').get((req, res) => {
      this.controller.getUserWithLikes(req, res)
    })

    this.router.route('/user/:id/favorites').get((req, res) => {
      this.controller.getUserWithFavorites(req, res)
    })
  }
}
