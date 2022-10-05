import { Comment } from '../Entities/comment.entity'
import { Like } from '../Entities/like.entity'
import { IBaseDTO } from './base.interfaces'

export enum RoleTypes {
  USER = 'User',
  ADMIN = 'Admin',
}

export interface IUserDTO extends IBaseDTO {
  username: string
  role: RoleTypes[]
  email: string
  likes: Like[]
  comments: Comment[]
}

export interface IUser extends IUserDTO {
  password: string
}
