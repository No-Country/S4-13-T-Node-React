import { IPost } from '../Interfaces/post.interfaces'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity()
export class Post extends BaseEntity implements IPost {
  @Column()
  title: string

  @Column()
  mediaURL: string

  @Column()
  tag: string

  @Column()
  user_id: number

  @Column({ default: 0 })
  likesCount: number

  @Column({ default: 0 })
  commentsCount: number
}
