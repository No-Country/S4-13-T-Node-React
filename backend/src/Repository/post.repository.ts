import { BaseRepository } from './base.repository'
import { IPost } from '../Interfaces/post.interfaces'
import { Post } from '../Entities/post.entity'

export class PostRepository extends BaseRepository<IPost> {
  constructor() {
    super(Post)
  }
}
