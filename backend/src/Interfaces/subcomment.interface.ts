import { BaseDTO } from '../DTO/base.dto'
import { Comment } from '../Entities/comment.entity'
import { User } from '../Entities/user.entity'

export interface ISubcommentDTO extends BaseDTO {
  subcomment: string

  user?: User

  comment?: Comment
}

export interface ISubcomment extends ISubcommentDTO {}
