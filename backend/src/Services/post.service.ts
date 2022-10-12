import { IPost, UpdatePost } from '../Interfaces/post.interfaces'
import { PostRepository } from '../Repository/post.repository'
import { LikeService } from './like.service'

export class PostService {
  private readonly alias: string
  private readonly relation: string
  constructor(
    private readonly postRepository: PostRepository = new PostRepository(),
    private readonly likeService: LikeService = new LikeService()
  ) {
    this.alias = 'post'
    this.relation = 'user'
  }
  async create(post: IPost) {
    return await this.postRepository.create(post)
  }
  async findAll(page: any = 1, size: any = 20, sort: any, word?: any) {
    const [posts, total] = await this.postRepository.list(this.alias, this.relation, {
      size,
      page,
      sort,
      word,
      property: 'title',
    })
    const last_page = Math.ceil(total / size)
    return [posts, total, last_page]
  }

  async findByID(id: number) {
    return await this.postRepository.get('post', { id })
  }

  async findWithUser(id: number) {
    return await this.postRepository.findWithUser(id)
  }

  async findWithComments(id: number) {
    return await this.postRepository.findWithComments(id)
  }

  async update(id: number, data: UpdatePost) {
    const updated = await this.postRepository.update(data, { id })
    if (updated.affected === 0) {
      return { error: 'Post not found or is deleted.' }
    }
    return updated.raw
  }

  async remove(id: number) {
    const deleted = await this.postRepository.remove({ id })
    if (deleted.affected === 0) {
      return { error: 'Post not found or already deleted.' }
    }
    return deleted.raw
  }

  async like(data: any) {
    const { user, post } = data
    const findPost = await this.findByID(post)
    if (!findPost) return { error: 'Not found.' }

    const userLike = await this.likeService.likeRepository.get('like', { user, post })
    if (userLike) {
      await this.likeService.likeRepository.remove({ id: userLike.id })
      await this.update(post, { likesCount: findPost.likesCount - 1 })
      return { liked: false, message: 'Disliked.', likesCount: findPost.likesCount }
    }

    await this.likeService.likeRepository.create(data)

    await this.update(post, { likesCount: findPost.likesCount + 1 })

    return { liked: true, message: 'Liked.', likesCount: findPost.likesCount }
  }
}
