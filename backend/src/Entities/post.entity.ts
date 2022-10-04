import { IPost } from '../Interfaces/post.interfaces'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Like } from './like.entity'
import { Comment } from './comment.entity'

@Entity()
export class Post extends BaseEntity implements IPost {
  @Column()
  title: string

  @Column()
  media_url: string

  @Column()
  tag: string

  @Column()
  user_id: number

  @Column({ default: 0 })
  likesCount: number

  @Column({ default: 0 })
  commentsCount: number

  @OneToMany(() => Like, like => like.post)
  likes: Like[]

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]
}
