import { IPost, IPostDTO } from '@src/Interfaces/post.interfaces'
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
      return error
    }
  }
  async getPosts() {
    try {
      return await this.repository.list()
    } catch (error) {
      return error
    }
  }
  async getPostById(id: number) {
    try {
      return await this.repository.get(id)
    } catch (error) {
      return error
    }
  }

  async updatePost(id: number, data: IPostDTO) {
    try {
      return await this.repository.update(id, data)
    } catch (error) {
      return error
    }
  }

  async removePost(id: number) {
    try {
      return await this.repository.remove(id)
    } catch (error) {
      return error
    }
  }
}

export default new PostService()
