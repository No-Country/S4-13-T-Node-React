import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ISubcommentDTO } from '../Interfaces/subcomment.interface'
import { BaseEntity } from './base.entity'
import { Comment } from './comment.entity'
import { User } from './user.entity'

@Entity()
export class Subcomment extends BaseEntity implements ISubcommentDTO {
  @Column()
  subcomment: string

  @ManyToOne(() => User, user => user.subcomments)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @ManyToOne(() => Comment, comment => comment.subcomments)
  @JoinColumn({ name: 'comment_id' })
  comment?: Comment
}
