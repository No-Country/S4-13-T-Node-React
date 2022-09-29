import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm'
  import {User} from './User.entity'
  import {Post} from './Post.entity'
  @Entity()
  export class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @ManyToOne(() => User, (user) => user.likes)
    user: User

    @ManyToOne(() => Post, (post) => post.likes)
    post: Post

    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @DeleteDateColumn()
    deleted_at: Date
  }
  