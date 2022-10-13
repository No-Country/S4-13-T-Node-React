import { IComment } from '../Interfaces/comment.interface'
import { Query } from '../Interfaces/repository.interface'
import { CommentRepository } from '../Repository/comment.repository'
import { BaseService } from './base.service'

export class CommentService extends BaseService {
  private readonly alias
  constructor(private readonly commentRepository: CommentRepository = new CommentRepository()) {
    super()
    this.alias = 'comment'
  }

  async create(data: IComment) {
    return await this.commentRepository.create(data)
  }

  async find(query: Query, addSelect?: string) {
    return await this.commentRepository.find(this.alias, query, addSelect)
  }

  async findWithUser(query: Query) {
    return await this.commentRepository.findWithUser(query)
  }

  async delete(query: Query) {
    const deleted = await this.commentRepository.delete(query)
    if (deleted.affected === 0) {
      return { error: 'Comment not found or already deleted.' }
    }
    return { comment: deleted.raw }
  }
}
