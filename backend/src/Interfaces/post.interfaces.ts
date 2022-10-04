import { BaseEntity } from '../Entities/base.entity'
import { IBaseDTO } from './base.interfaces'

export interface IPostDTO {
  title: string
  tag: string
  media_url: string
  user_id: number
}
export interface IPost extends IPostDTO, IBaseDTO, BaseEntity {
  likesCount: number
  commentsCount: number
}
