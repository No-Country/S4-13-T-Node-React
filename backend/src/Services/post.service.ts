import { IPost, UpdatePost } from '../Interfaces/post.interfaces'
import { Query } from '../Interfaces/repository.interface'
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

  async find(query: Query, addSelect?: string) {
    return await this.postRepository.find(this.alias, query, addSelect)
  }

  async findWithUser(id: number) {
    return await this.postRepository.findWithUser({ id })
  }

  async findWithComments(id: number) {
    return await this.postRepository.findWithComments({ id })
  }

  async update(query: Query, data: UpdatePost) {
    const updated = await this.postRepository.update(data, query)
    if (updated.affected === 0) {
      return { error: 'Post not found or is deleted.' }
    }
    return { post: updated.raw }
  }

  async remove(id: number) {
    const deleted = await this.postRepository.remove({ id })
    if (deleted.affected === 0) {
      return { error: 'Post not found or already deleted.' }
    }
    return { post: deleted.raw }
  }

  async like(ids: any) {
    const post = await this.find({ id: ids.post })
    if (!post) return { error: 'Post not found.' }

    const userLike = await this.likeService.find({ user: ids.user, post: ids.post })

    if (userLike) {
      const deleted = await this.likeService.remove({ id: userLike.id })
      if (deleted.error) return { error: 'Error while deleting Like with id: ' + userLike.id }

      const updated = await this.update({ id: ids.post }, { likesCount: post.likesCount - 1 })
      if (updated.error) return { error: 'Error while decrease likeCount on post with id: ' + ids.post }
      return { liked: false, message: 'Like removed.', likesCount: updated.post[0].likesCount }
    }

    await this.likeService.create(ids)

    const updated = await this.update({ id: ids.post }, { likesCount: post.likesCount + 1 })
    if (updated.error) return { error: 'Error while increment likeCount on post with id: ' + ids.post }

    return { liked: true, message: 'Liked.', likesCount: updated.post[0].likesCount }
  }
}
