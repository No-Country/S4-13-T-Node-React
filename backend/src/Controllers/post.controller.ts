import { Request, Response } from 'express'
import Services from '../Services'
import httpResponse from '../Utils/http.response'

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const post = req.body
      const result = await Services.Post.createPost(post)
      res.json({ message: 'Post Created Successfully.', post: result })
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const { page = '1', size = '20', sort = 'desc' } = req.query
      const [posts, total, last_page] = await Services.Post.getPosts(Number(page), Number(size), String(sort))
      return [res.status(200).json({ posts, actual_page: Number(page), size: Number(size), total, last_page })]
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const post = await Services.Post.getPostById(id)
      if (post) return res.json({ post })
      return httpResponse.NotFound(res, 'Post not found.')
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const data = req.body
      const post = await Services.Post.updatePost(id, data)
      if (post.error) {
        return httpResponse.NotFound(res, post.error)
      }
      return res.json({ message: 'Post Updated Successfully.', post })
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }

  async removePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const post = await Services.Post.removePost(id)
      if (post.error) {
        return httpResponse.NotFound(res, post.error)
      }
      return res.json({ message: 'Post Deleted Successfully.', post })
    } catch (error) {
      return res.status(500).json({ message: `Error unexpected ${error}` })
    }
  }
}

export default new PostController()
