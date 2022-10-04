import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Post } from './post.entity'
import { ILikeDTO } from '../Interfaces/like.interface'
@Entity()
export class Like extends BaseEntity implements ILikeDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: Post
}
