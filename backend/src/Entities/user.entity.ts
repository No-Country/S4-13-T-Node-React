import { Column, Entity, OneToMany } from 'typeorm'
import { IUser, RoleTypes } from '../Interfaces/user.interfaces'
import { BaseEntity } from './base.entity'
import { Comment } from './comment.entity'
import { Favorite } from './favorite.entity'
import { Like } from './like.entity'
import { Post } from './post.entity'

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({ unique: true, nullable: true, default: null })
  google_id: string

  @Column({ unique: true })
  username: string

  @Column({ default: 'https://loremflickr.com/640/480/cats' })
  avatar_url: string

  @Column({ select: false, nullable: true, default: null })
  password: string

  @Column({ type: 'text', array: true, default: ['User'], enum: ['Admin', 'User'] })
  role: RoleTypes[]

  @Column({ unique: true })
  email: string

  @OneToMany(() => Post, post => post.user)
  post: Post[]

  @OneToMany(() => Like, like => like.user)
  likes: Like[]

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[]
}
