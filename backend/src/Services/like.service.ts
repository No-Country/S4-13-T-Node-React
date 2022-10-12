import { LikeRepository } from '../Repository/like.repository'
import { BaseService } from './base.service'

export class LikeService extends BaseService {
  constructor(public readonly likeRepository: LikeRepository = new LikeRepository()) {
    super()
  }
}
