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
        this.middleware.passAuth('jwt', { session: false }),
        (req, res, next) => {
          this.middleware.createPostValidator(req, res, next)
        },
        (req, res) => {
          this.controller.createPost(req, res)
        }
      )
      .get(
        (req, res, next) => {
          this.middleware.getPostsValidator(req, res, next)
        },
        (req, res) => {
          this.controller.getPosts(req, res)
        }
      )

    this.router
      .route('/post/:id')
      .get((req, res) => {
        this.controller.getPost(req, res)
      })
      .put(
        this.middleware.passAuth('jwt', { session: false }),
        (req, res, next) => this.middleware.checkUserIsPostOwner(req, res, next),
        (req, res, next) => {
          this.middleware.updatePostValidator(req, res, next)
        },
        (req, res) => {
          this.controller.updatePost(req, res)
        }
      )
      .delete(
        this.middleware.passAuth('jwt', { session: false }),
        (req, res, next) => this.middleware.checkUserIsPostOwner(req, res, next),
        (req, res) => {
          this.controller.removePost(req, res)
        }
      )
  }
}
