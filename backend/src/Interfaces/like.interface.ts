import { BaseEntity } from '../Entities/base.entity'
import { Post } from '../Entities/post.entity'
import { User } from '../Entities/user.entity'
import { IBaseDTO } from './base.interfaces'

export interface ILikeDTO {
  user: User

  post: Post
}

export interface ILike extends ILikeDTO, IBaseDTO, BaseEntity {}
