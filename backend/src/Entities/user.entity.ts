import { Column, Entity, OneToMany } from 'typeorm'
import { IUser, RoleTypes } from '../Interfaces/user.interfaces'
import { BaseEntity } from './base.entity'
import { Comment } from './comment.entity'
import { Favorite } from './favorite.entity'
import { Like } from './like.entity'
import { Post } from './post.entity'

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({ unique: true })
  username: string

  @Column({ select: false })
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
