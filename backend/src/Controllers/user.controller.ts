import { Request, Response } from 'express'
import { UserService } from '../Services/user.service'
import { HttpResponse } from '../Utils/http.response'

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = req.body
      const result = await this.userService.createUser(user)
      return this.httpResponse.Ok(res, { message: 'User Created Successfully.', user: result })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const [users, total, last_page] = await this.userService.getUsers(Number(page), Number(size), String(sort))
      return this.httpResponse.Ok(res, { users, actual_page: Number(page), size: Number(size), total, last_page })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const user = await this.userService.getUser(id)

      if (user) return this.httpResponse.Ok(res, { user })

      return this.httpResponse.NotFound(res, 'User not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUserWithFavorites(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const user = await this.userService.getUserWithFavorites(id)

      if (user) return this.httpResponse.Ok(res, { user })

      return this.httpResponse.NotFound(res, 'User not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUserWithLikes(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const user = await this.userService.getUserWithLikes(id)

      if (user) return this.httpResponse.Ok(res, { user })

      return this.httpResponse.NotFound(res, 'User not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const data = req.body
      const user = await this.userService.updateUser(id, data)
      if (user.error) {
        return this.httpResponse.NotFound(res, user.error)
      }
      return this.httpResponse.Ok(res, { message: 'User Updated Successfully.', user })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async removeUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const user = await this.userService.removeUser(id)
      if (user.error) {
        return this.httpResponse.NotFound(res, user.error)
      }
      return this.httpResponse.Ok(res, { message: 'User Deleted Successfully.', user })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }
}
