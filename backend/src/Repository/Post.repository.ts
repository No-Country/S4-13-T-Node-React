import { Repository } from './Repository'
import Entities from '../Entities'
import { IPost } from '../Interfaces/post.interfaces'
import { AppDataSource } from '../Config/db'

const Post = AppDataSource.getRepository(Entities.Post)
class PostRepository extends Repository<IPost> {
  constructor() {
    super(Post)
  }
}

export default new PostRepository()
