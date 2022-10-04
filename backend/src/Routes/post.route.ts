import { MiddlewareValidator } from '../Middleware/validate.middleware'
import { BaseRouter } from './base.router'
import { PostController } from '../Controllers/post.controller'

export class PostRouter extends BaseRouter<PostController, MiddlewareValidator> {
  constructor() {
    super(PostController, MiddlewareValidator)
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
        this.controller.getPostById(req, res)
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
