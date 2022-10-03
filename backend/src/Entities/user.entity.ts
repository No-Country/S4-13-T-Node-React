import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Like } from './like.entity'

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string

  @Column()
  password_hash: string

  @Column()
  role: string

  @Column()
  email: string

  @OneToMany(() => Like, like => like.user)
  likes: Like[]
}
