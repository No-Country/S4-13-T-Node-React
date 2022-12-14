import { PostMiddleware } from '../Middleware/post.middleware'
import { BaseRouter } from './base.routes'
import { PostController } from '../Controllers/post.controller'

export class PostRouter extends BaseRouter<PostController, PostMiddleware> {
  constructor() {
    super(PostController, PostMiddleware)
  }

  routes(): void {
    this.router
      .route('/post')
      .post(
        (req, res, next) => {
          this.middleware.createPostValidator(req, res, next)
        },
        (req, res, next) => this.middleware.getAccessToken(req, res, next),
        (req, res) => {
          this.controller.create(req, res)
        }
      )
      .get(
        (req, res, next) => {
          this.middleware.getPostsValidator(req, res, next)
        },
        (req, res) => {
          this.controller.findAll(req, res)
        }
      )

    this.router
      .route('/post/:id')
      .get((req, res) => {
        this.controller.findWithComments(req, res)
      })
      .put(
        (req, res, next) => this.middleware.getAccessToken(req, res, next),
        (req, res, next) => this.middleware.checkUserIsPostOwner(req, res, next),
        (req, res, next) => {
          this.middleware.updatePostValidator(req, res, next)
        },
        (req, res) => {
          this.controller.update(req, res)
        }
      )
      .delete(
        (req, res, next) => this.middleware.getAccessToken(req, res, next),
        (req, res, next) => this.middleware.checkUserIsPostOwner(req, res, next),
        (req, res) => {
          this.controller.remove(req, res)
        }
      )

    this.router.post(
      '/post/:id/like',
      (req, res, next) => this.middleware.getAccessToken(req, res, next),
      (req, res) => this.controller.like(req, res)
    )

    this.router.post(
      '/post/:id/comment',
      (req, res, next) => this.middleware.commentPostValidator(req, res, next),
      (req, res, next) => this.middleware.getAccessToken(req, res, next),
      (req, res) => this.controller.comment(req, res)
    )

    this.router.post(
      '/post/:id/favorite',
      (req, res, next) => this.middleware.getAccessToken(req, res, next),
      (req, res) => this.controller.favorite(req, res)
    )
  }
}
