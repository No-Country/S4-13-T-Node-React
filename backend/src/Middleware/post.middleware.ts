import { getPostRequest, PostDTO, updatePostRequest } from '../DTO/post.dto'
import { IPostDTO } from '../Interfaces/post.interfaces'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from './base.middleware'

export class PostMiddleware extends BaseMiddleware {
  constructor() {
    super()
  }

  createPostValidator(req: Request, res: Response, next: NextFunction) {
    const { title, tags, media_url }: IPostDTO = req.body

    const valid = new PostDTO()

    valid.title = title
    valid.media_url = media_url
    valid.tags = tags

    validate(valid, { validationError: { target: false } }).then(err => {
      if (err.length > 0) {
        return this.httpResponse.BadRequest(res, err)
      } else {
        next()
      }
    })
  }

  getPostsValidator(req: Request, res: Response, next: NextFunction) {
    const { page = '1', size = '20', sort = 'desc' } = req.query

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

  updatePostValidator(req: Request, res: Response, next: NextFunction) {
    const { title, tags }: updatePostRequest = req.body

    const valid = new updatePostRequest()

    valid.tags = tags
    valid.title = title

    if (title || tags) {
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
