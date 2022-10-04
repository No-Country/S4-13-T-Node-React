import { getPostRequest, PostDTO, updatePostRequest } from '../DTO/post.dto'
import { IPostDTO } from '../Interfaces/post.interfaces'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from './base.middleware'

// Lo ideal es que MiddlewareValidator expanda de BaseMiddleware pero me tira error cuando uso this.httpResponse
// export class MiddlewareValidator extends BaseMiddleware {
export class MiddlewareValidator extends BaseMiddleware {
  createPost(req: Request, res: Response, next: NextFunction) {
    const { title, tag, media_url, user_id }: IPostDTO = req.body

    const valid = new PostDTO()

    valid.title = title
    valid.media_url = media_url
    valid.tag = tag
    valid.user_id = user_id

    validate(valid, { validationError: { target: false } }).then(err => {
      if (err.length > 0) {
        // return this.httpResponse.Error(res,err)
        return this.httpResponse.BadRequest(res, err)
      } else {
        next()
      }
    })
  }

  getRequestPost(req: Request, res: Response, next: NextFunction) {
    const { page = 1, size = 20, sort = 'desc' } = req.query

    const valid = new getPostRequest()

    valid.page = Number(page)
    valid.size = Number(size)
    valid.sort = sort

    validate(valid, { validationError: { target: false } }).then(err => {
      if (err.length > 0) {
        return this.httpResponse.BadRequest(res, err)
      } else {
        next()
      }
    })
  }

  getUpdatePost(req: Request, res: Response, next: NextFunction) {
    const { title, tag } = req.body

    const valid = new updatePostRequest()

    valid.tag = tag
    valid.title = title

    if (title || tag) {
      validate(valid, { validationError: { target: false } }).then(err => {
        if (err.length > 0) {
          return this.httpResponse.BadRequest(res, err)
        } else {
          next()
        }
      })
    } else {
      return this.httpResponse.BadRequest(res, 'Need at least one value.')
    }
  }
}

// export default new MiddlewareValidator()
