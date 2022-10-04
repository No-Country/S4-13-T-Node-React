import { IPost } from '../Interfaces/post.interfaces'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Like } from './like.entity'
import { Comment } from './comment.entity'
import { User } from './user.entity'

@Entity()
export class Post extends BaseEntity implements IPost {
  @Column()
  title: string

  @Column()
  media_url: string

  @Column()
  tag: string

  @ManyToOne(() => User, user => user.post)
  @JoinColumn({ name: 'user_id' })
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
