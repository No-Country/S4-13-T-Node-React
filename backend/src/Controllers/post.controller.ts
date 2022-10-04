import { Request, Response } from 'express'
import { PostService } from '../Services/post.service'
import { HttpResponse } from '../Utils/http.response'

export class PostController {
  constructor(
    private readonly postService: PostService = new PostService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async createPost(req: Request, res: Response) {
    try {
      const post = req.body
      const result = await this.postService.createPost(post)
      this.httpResponse.Ok(res, { message: 'Post Created Successfully.', post: result })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const [posts, total, last_page] = await this.postService.getPosts(Number(page), Number(size), String(sort))
      return this.httpResponse.Ok(res, { posts, actual_page: Number(page), size: Number(size), total, last_page })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const post = await this.postService.getPost(id)
      if (post) return this.httpResponse.Ok(res, { post })
      return this.httpResponse.NotFound(res, 'Post not found.')
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const data = req.body
      const post = await this.postService.updatePost(id, data)
      if (post.error) {
        return this.httpResponse.NotFound(res, post.error)
      }
      return this.httpResponse.Ok(res, { message: 'Post Updated Successfully.', post })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async removePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const post = await this.postService.removePost(id)
      if (post.error) {
        return this.httpResponse.NotFound(res, post.error)
      }
      return this.httpResponse.Ok(res, { message: 'Post Deleted Successfully.', post })
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }
}
