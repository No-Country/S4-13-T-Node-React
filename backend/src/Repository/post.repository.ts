import { BaseRepository } from './base.repository'
import { IPost } from '../Interfaces/post.interfaces'
import { Post } from '../Entities/post.entity'
import { Query } from 'typeorm/driver/Query'

export class PostRepository extends BaseRepository<IPost> {
  constructor() {
    super(Post)
  }

  async findWithComments(id: number, query?: Query | undefined): Promise<IPost | null> {
    const builder = (await this.repository).createQueryBuilder('post')

    builder.leftJoinAndSelect('post.user', 'user')
    builder.leftJoinAndSelect('post.comments', 'comment')
    builder.leftJoinAndSelect('comment.user', 'user_comment')

    builder.where({ id })

    return await builder.getOne()
  }

  async findWithUser(id: number, query?: Query | undefined): Promise<IPost | null> {
    const builder = (await this.repository).createQueryBuilder('post')

    builder.leftJoinAndSelect('post.user', 'user')

    return await builder.getOne()
  }
}
