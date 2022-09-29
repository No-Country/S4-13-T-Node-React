import { Repository } from './Repository'
import Entities from '../Entities'
import { IPost } from '@src/Interfaces/post.interfaces'
import { AppDataSource } from '../Config/db'

const Post = AppDataSource.getRepository(Entities.Post)
class PostRepository extends Repository<IPost> {
  constructor(post: typeof Post) {
    super(post)
  }
}

export default new PostRepository(Post)
