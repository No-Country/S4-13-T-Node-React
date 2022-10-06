import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { RequestUser, RoleTypes } from '../Interfaces/user.interfaces'
import { HttpResponse } from '../Utils/http.response'
import { PostService } from '../Services/post.service'
import { UserService } from '../Services/user.service'

export class BaseMiddleware {
  constructor(
    public httpResponse: HttpResponse = new HttpResponse(),
    private readonly postService: PostService = new PostService(),
    private readonly userService: UserService = new UserService()
  ) {}

  passAuth(type: string) {
    return passport.authenticate(type, { session: false })
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as RequestUser

    if (!user.role!.includes(RoleTypes.ADMIN)) {
      return this.httpResponse.Unauthorized(res, 'No permissions.')
    }

    return next()
  }

  async checkUserIsPostOwner(req: Request, res: Response, next: NextFunction) {
    const user = req.user as RequestUser

    const post = await this.postService.getPost(Number(req.params.id))

    if (user.sub === post?.user?.id) {
      next()
    } else {
      return this.httpResponse.Unauthorized(res, 'Unauthorized.')
    }
  }

  async checkUserIsUserOwner(req: Request, res: Response, next: NextFunction) {
    const user = req.user as RequestUser

    const user_found = await this.userService.getUser(Number(req.params.id))

    if (user.sub === user_found?.id) {
      next()
    } else {
      return this.httpResponse.Unauthorized(res), 'Unauthorized.'
    }
  }
}
