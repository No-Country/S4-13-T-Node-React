import { IPost } from '@src/Interfaces/post.interfaces'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import {Like} from './like.entity';
@Entity()
export class Post extends BaseEntity implements IPost {
  @PrimaryGeneratedColumn()
  id: number

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

  @OneToMany (()=>Like, (like)=>like.post)
  likes: Like[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
