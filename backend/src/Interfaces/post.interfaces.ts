import { IBaseDTO } from './base.interfaces'

export interface IPostDTO extends IBaseDTO {
  title: string
  tag: string
  media_url: string
  user_id: number
}

export interface IPost extends IPostDTO {
  likesCount: number
  commentsCount: number
}
