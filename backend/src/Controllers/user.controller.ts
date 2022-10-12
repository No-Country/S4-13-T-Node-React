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

      const user_exist = await this.userService.findByUsername(user.username)

      if (user_exist) {
        return this.httpResponse.BadRequest(res, { message: 'User already exist.' })
      }

      const email_exist = await this.userService.findByEmail(user.email)

      if (email_exist) {
        return this.httpResponse.BadRequest(res, { message: 'Email already exist.' })
      }

      const result = await this.userService.createUser(user)
      return this.httpResponse.Ok(res, { message: 'User Created Successfully.', user: result })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const [users, total, last_page] = await this.userService.findAll(Number(page), Number(size), String(sort))
      return this.httpResponse.Ok(res, { users, actual_page: Number(page), size: Number(size), total, last_page })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const user = await this.userService.findById(id)

      if (user) return this.httpResponse.Ok(res, { user })

      return this.httpResponse.NotFound(res, 'User not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUserWithPosts(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const id = Number(req.params.id)
      const user = await this.userService.findByIdWithPosts(id, Number(page), Number(size), String(sort))

      if (user)
        return this.httpResponse.Ok(res, {
          user,
          actual_page: Number(page),
          size: Number(size),
        })

      return this.httpResponse.NotFound(res, 'User not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUserWithFavorites(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const id = Number(req.params.id)
      const user = await this.userService.findByIdWithFavorites(id, Number(page), Number(size), String(sort))

      if (user) return this.httpResponse.Ok(res, { user, actual_page: Number(page), size: Number(page) })

      return this.httpResponse.NotFound(res, 'User not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getUserWithLikes(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const id = Number(req.params.id)
      const user = await this.userService.findByIdWithLikes(id, Number(page), Number(size), String(sort))

      if (user) return this.httpResponse.Ok(res, { user, actual_page: Number(page), size: Number(page) })

      return this.httpResponse.NotFound(res, 'User not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { username, email, password } = req.body

      const user_found = await this.userService.findByUsername(username)

      if (user_found) {
        return this.httpResponse.BadRequest(res, 'Username already exist.')
      }

      const email_found = await this.userService.findByEmail(email)

      if (email_found) {
        return this.httpResponse.BadRequest(res, 'Email already exist.')
      }

      const user = await this.userService.update(id, { username, email, password })
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
      const user = await this.userService.remove(id)
      if (user.error) {
        return this.httpResponse.NotFound(res, user.error)
      }
      return this.httpResponse.Ok(res, { message: 'User Deleted Successfully.', user })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }
}
