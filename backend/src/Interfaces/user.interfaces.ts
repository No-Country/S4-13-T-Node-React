import { Comment } from '../Entities/comment.entity'
import { Like } from '../Entities/like.entity'
import { IBaseDTO } from './base.interfaces'

export interface IUserDTO extends IBaseDTO {
  username: string
  role: string[]
  email: string
  likes: Like[]
  comments: Comment[]
}

export interface IUser extends IUserDTO {
  password_hash: string
}
