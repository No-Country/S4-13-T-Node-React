import { BaseEntity } from '../Entities/base.entity'
import { Comment } from '../Entities/comment.entity'
import { Like } from '../Entities/like.entity'
import { IBaseDTO } from './base.interfaces'

export interface IUserDTO {
  username: string

  role: string[]

  email: string
}

export interface IUser extends IUserDTO, IBaseDTO, BaseEntity {
  password_hash: string

  likes: Like[]

  comments: Comment[]
}
