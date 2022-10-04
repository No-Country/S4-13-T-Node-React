import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ICommentDTO } from '../Interfaces/comment.interface'
import { Post } from './post.entity'
import { User } from './user.entity'

@Entity()
export class Comment extends BaseEntity implements ICommentDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  comment: string

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post
}
