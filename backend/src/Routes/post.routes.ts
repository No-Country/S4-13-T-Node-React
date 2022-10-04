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
          this.middleware.createPost(req, res, next)
        },
        (req, res) => {
          this.controller.createPost(req, res)
        }
      )
      .get(
        (req, res, next) => {
          this.middleware.getRequestPost(req, res, next)
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
        (req, res, next) => {
          this.middleware.getUpdatePost(req, res, next)
        },
        (req, res) => {
          this.controller.updatePost(req, res)
        }
      )
      .delete((req, res) => {
        this.controller.removePost(req, res)
      })
  }
}
