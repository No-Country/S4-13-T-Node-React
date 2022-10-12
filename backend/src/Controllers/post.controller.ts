import { Request, Response } from 'express'
import { PostService } from '../Services/post.service'
import { HttpResponse } from '../Utils/http.response'
import { ConfigServer } from '../Config/config'
import { IUser, RequestUser } from '../Interfaces/user.interfaces'
export class PostController extends ConfigServer {
  constructor(
    private readonly postService: PostService = new PostService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
    super()
  }
  async create(req: Request, res: Response) {
    try {
      const user = req.user as RequestUser
      const post = req.body
      post.user = user.sub
      const result = await this.postService.create(post)
      this.httpResponse.Ok(res, { message: 'Post Created Successfully.', post: result })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc', word } = req.query
      const [posts, total, last_page] = await this.postService.findAll(Number(page), Number(size), sort, word)
      return this.httpResponse.Ok(res, { posts, actual_page: Number(page), size: Number(size), total, last_page })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async findWithComments(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const post = await this.postService.findWithComments(id)
      if (post) return this.httpResponse.Ok(res, { post })
      return this.httpResponse.NotFound(res, 'Post not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const data = req.body
      const { post, error } = await this.postService.update({ id }, data)
      if (error) {
        return this.httpResponse.NotFound(res, error)
      }
      return this.httpResponse.Ok(res, { message: 'Post Updated Successfully.', post: post[0] })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { post, error } = await this.postService.remove(id)
      if (error) {
        return this.httpResponse.NotFound(res, error)
      }
      return this.httpResponse.Ok(res, { message: 'Post Deleted Successfully.', post: post[0] })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async like(req: Request, res: Response) {
    try {
      const user = req.user as IUser
      const id = req.params.id
      const response = await this.postService.like({ user: user.id, post: id })
      if (response.error) return this.httpResponse.BadRequest(res, response.error)
      return this.httpResponse.Ok(res, { ...response })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async comment(req: Request, res: Response) {
    try {
      const user = req.user as IUser
      const id = req.params.id
      const { comment } = req.body
      const response = await this.postService.comment({ user: user.id, post: id, comment })
      if (response.error) return this.httpResponse.BadRequest(res, response.error)
      return this.httpResponse.Ok(res, { ...response })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }
}
