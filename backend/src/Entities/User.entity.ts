import { Column, Entity } from 'typeorm'
import { BaseEntity } from './Base.entity'

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
}
