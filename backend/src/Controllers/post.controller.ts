import { Request, Response } from 'express'
import { PostService } from '../Services/post.services'
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
      res.json({ message: 'Post Created Successfully.', post: result })
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const [posts, total, last_page] = await this.postService.getPosts(Number(page), Number(size), String(sort))
      return [res.status(200).json({ posts, actual_page: Number(page), size: Number(size), total, last_page })]
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const post = await this.postService.getPostById(id)
      if (post) return res.json({ post })
      return this.httpResponse.NotFound(res, 'Post not found.')
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
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
      return res.json({ message: 'Post Updated Successfully.', post })
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }

  async removePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const post = await this.postService.removePost(id)
      if (post.error) {
        return this.httpResponse.NotFound(res, post.error)
      }
      return res.json({ message: 'Post Deleted Successfully.', post })
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }
}
