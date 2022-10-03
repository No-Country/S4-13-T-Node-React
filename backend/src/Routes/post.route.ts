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
      .post(this.middleware.createPost, this.controller.createPost)
      .get(this.middleware.getRequestPost, this.controller.getPosts)

    this.router
      .route('/post/:id')
      .get(this.controller.getPostById)
      .put(this.middleware.getUpdatePost, this.controller.updatePost)
      .delete(this.controller.removePost)
  }
}
