import { IPost, IPostDTO } from '../Interfaces/post.interfaces'
import { PostRepository } from '../Repository/post.repository'

export class PostService {
  private readonly alias: string
  private readonly relation: string
  constructor(private readonly postRepository: PostRepository = new PostRepository()) {
    this.alias = 'post'
    this.relation = 'user'
  }
  async createPost(post: IPost) {
    return await this.postRepository.create(post)
  }
  async getPosts(page: number = 1, size: number = 20, sort: string) {
    const [posts, total] = await this.postRepository.list(this.alias, this.relation, {
      size,
      page,
      sort,
    })
    const last_page = Math.ceil(total / size)
    return [posts, total, last_page]
  }

  async getPost(id: number) {
    return await this.postRepository.getPostWithComments(id)
  }

  async updatePost(id: number, data: IPostDTO) {
    const updated = await this.postRepository.update(id, data)
    if (updated.affected === 0) {
      return { error: 'Post not found or is deleted.' }
    }
    return updated.raw
  }

  async removePost(id: number) {
    const deleted = await this.postRepository.remove(id)
    if (deleted.affected === 0) {
      return { error: 'Post not found or already deleted.' }
    }
    return deleted.raw
  }
}
