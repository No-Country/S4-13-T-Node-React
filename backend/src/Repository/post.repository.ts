import { BaseRepository } from './base.repository'
import { IPost } from '../Interfaces/post.interfaces'
import { Post } from '../Entities/post.entity'
import { Query } from 'typeorm/driver/Query'
import { QueryList } from '../Interfaces/repository.interface'

export class PostRepository extends BaseRepository<IPost> {
  constructor() {
    super(Post)
  }

  async getPostWithComments(id: number, query?: Query | undefined): Promise<IPost | null> {
    const builder = (await this.repository).createQueryBuilder('post')

    builder.leftJoinAndSelect('post.user', 'user')
    builder.leftJoinAndSelect('post.comments', 'comment')
    builder.leftJoinAndSelect('comment.user', 'user_comment')

    builder.where({ id })

    return await builder.getOne()
  }

  async getPostsByUser(id: number, query?: QueryList): Promise<[IPost[], number]> {
    const { page, size, sort } = query!
    const builder = (await this.repository).createQueryBuilder('post')
    builder.where({ user: id })

    builder
      .offset((page - 1) * size)
      .limit(size)
      .orderBy(`post.created_at`, sort.toUpperCase())

    const [list, total] = await builder.getManyAndCount()
    return [list, total]
  }
}
