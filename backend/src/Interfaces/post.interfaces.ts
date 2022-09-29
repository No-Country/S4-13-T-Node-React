import { BaseEntity } from 'typeorm'

export interface IPostDTO extends BaseEntity {
  title: string
  tag: string
  mediaURL: string
}
export interface IPost extends IPostDTO {
  id: number
  likesCount: number
  commentsCount: number
  user_id: number
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
