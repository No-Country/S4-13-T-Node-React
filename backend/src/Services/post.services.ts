import { IPost, IPostDTO } from '../Interfaces/post.interfaces'
import { Query } from '../Interfaces/repository.interface'
import Repositories from '../Repository'

const Post = Repositories.Post

class PostService {
  private repository
  constructor() {
    this.repository = Post
  }
  async createPost(post: IPost) {
    try {
      return await this.repository.create(post)
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }
  async getPosts(page: number = 1, size: number = 20, sort: string) {
    try {
      return await this.repository.list({
        size,
        page,
        sort,
      })
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }
  async getPostById(id: number) {
    try {
      return await this.repository.get(id)
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }

  async updatePost(id: number, data: IPostDTO) {
    try {
      return await this.repository.update(id, data)
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }

  async removePost(id: number) {
    try {
      return await this.repository.remove(id)
    } catch (error) {
      throw new Error(`Unexpected server Error ${error}`)
    }
  }
}

export default new PostService()
