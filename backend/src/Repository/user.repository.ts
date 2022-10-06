import { User } from '../Entities/user.entity'
import { QueryList } from '../Interfaces/repository.interface'
import { IUser, RoleTypes } from '../Interfaces/user.interfaces'
import { BaseRepository } from './base.repository'

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User)
  }

  async getUserWithPosts(id: number, query?: QueryList): Promise<IUser | null> {
    const { page, size, sort } = query!

    return await (
      await this.repository
    )
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.post', 'post')
      .loadRelationCountAndMap('user.total_posts', 'user.post')
      .where({ id })
      .offset((page - 1) * size)
      .limit(size)
      .orderBy('post.created_at', sort.toUpperCase())
      .getOne()
  }

  async getUserWithLikes(id: number, query?: QueryList): Promise<IUser | null> {
    const { page, size, sort } = query!

    return await (
      await this.repository
    )
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likes', 'likes')
      .leftJoinAndSelect('likes.post', 'post')
      .where({ id })
      .offset((page - 1) * size)
      .limit(size)
      .orderBy('user.created_at', sort.toUpperCase())
      .getOne()
  }

  async getUserWithFavorites(id: number, query?: QueryList): Promise<IUser | null> {
    const { page, size, sort } = query!

    return await (
      await this.repository
    )
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favorites', 'favorites')
      .leftJoinAndSelect('favorites.post', 'post')
      .where({ id })
      .offset((page - 1) * size)
      .limit(size)
      .orderBy('user.created_at', sort.toUpperCase())
      .getOne()
  }

  async getUserWithRole(id: number, role: RoleTypes[]): Promise<IUser | null> {
    const user = (await this.repository).createQueryBuilder('user').where({ id }).andWhere({ role }).getOne()

    return user
  }

  async findUserByUsername(username: string): Promise<IUser | null> {
    return (await this.repository).createQueryBuilder('user').addSelect('user.password').where({ username }).getOne()
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return (await this.repository).createQueryBuilder('user').addSelect('user.password').where({ email }).getOne()
  }
}
