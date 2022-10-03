import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Post } from './post.entity'
@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.likes)
  user: User

  @ManyToOne(() => Post, post => post.likes)
  post: Post
}
