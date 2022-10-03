import { MiddlewareValidator } from '../Middleware/validate.middleware'
import { Router } from 'express'
import controllers from '../Controllers'

const postRoute = Router()

const middleware = new MiddlewareValidator()

postRoute
  .route('/post')
  .post(middleware.createPost, controllers.post.createPost)
  .get(middleware.getRequestPost, controllers.post.getPosts)

postRoute
  .route('/post/:id')
  .get(controllers.post.getPostById)
  .put(middleware.getUpdatePost, controllers.post.updatePost)
  .delete(controllers.post.removePost)

export default postRoute
