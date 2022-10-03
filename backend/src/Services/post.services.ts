import { IPost, IPostDTO } from '../Interfaces/post.interfaces'
import { PostRepository } from '../Repository/post.repository'

class PostService extends PostRepository {
  constructor() {
    super()
  }
  async createPost(post: IPost) {
    try {
      return await this.create(post)
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }
  async getPosts(page: number = 1, size: number = 20, sort: string) {
    try {
      const [posts, total] = await this.list({
        size,
        page,
        sort,
      })
      const last_page = Math.ceil(total / size)
      return [posts, total, last_page]
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }
  async getPostById(id: number) {
    try {
      return await this.get(id)
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }

  async updatePost(id: number, data: IPostDTO) {
    try {
      const updated = await this.update(id, data)
      if (updated.affected === 0) {
        return { error: 'Post not found or is deleted.' }
      }
      return updated.raw
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }

  async removePost(id: number) {
    try {
      const deleted = await this.remove(id)
      if (deleted.affected === 0) {
        return { error: 'Post not found or already deleted.' }
      }
      return deleted.raw
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }
}

export default new PostService()
