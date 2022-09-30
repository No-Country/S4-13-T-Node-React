import { PostDTO } from '../DTO/post.dto'
import { IPostDTO } from '../Interfaces/post.interfaces'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
// import { BaseMiddleware } from './base.middleware'
import HttpResponse from '../Utils/http.response'

// Lo ideal es que MiddlewareValidator expanda de BaseMiddleware pero me tira error cuando uso this.httpResponse
// export class MiddlewareValidator extends BaseMiddleware {
export class MiddlewareValidator {
  post(req: Request, res: Response, next: NextFunction) {
    const { title, tag, mediaURL, user_id }: IPostDTO = req.body

    const valid = new PostDTO()

    valid.title = title
    valid.mediaURL = mediaURL
    valid.tag = tag
    valid.user_id = user_id

    validate(valid, { validationError: { target: false } }).then(err => {
      if (err.length > 0) {
        // return this.httpResponse.Error(res,err)
        return HttpResponse.Error(res, err)
      } else {
        next()
      }
    })
  }
}

// export default new MiddlewareValidator()
