import { BaseEntity } from '../Entities/base.entity'
import { Post } from '../Entities/post.entity'
import { User } from '../Entities/user.entity'
import { IBaseDTO } from './base.interfaces'

export interface ICommentDTO {
  comment: string

  user: User

  post: Post
}

export interface IComment extends ICommentDTO, IBaseDTO, BaseEntity {}
