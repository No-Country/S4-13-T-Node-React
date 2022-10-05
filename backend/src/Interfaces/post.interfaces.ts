import { User } from '../Entities/user.entity'
import { IBaseDTO } from './base.interfaces'

export interface IPostDTO extends IBaseDTO {
  title: string
  tags: string[]
  media_url: string
  user: User
}

export interface IPost extends IPostDTO {
  likesCount: number
  commentsCount: number
}
