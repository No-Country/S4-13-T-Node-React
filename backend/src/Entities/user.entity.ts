import { Column, Entity, OneToMany } from 'typeorm'
import { IUser } from '../Interfaces/user.interfaces'
import { BaseEntity } from './base.entity'
import { Comment } from './comment.entity'
import { Like } from './like.entity'

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({ unique: true })
  username: string

  @Column()
  password_hash: string

  @Column({ type: 'text', array: true, default: ['User'], enum: ['Admin', 'User'] })
  role: string[]

  @Column()
  email: string

  @OneToMany(() => Like, like => like.user)
  likes: Like[]

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]
}
