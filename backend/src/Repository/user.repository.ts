import { User } from '../Entities/user.entity'
import { IUser, RoleTypes } from '../Interfaces/user.interfaces'
import { BaseRepository } from './base.repository'

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User)
  }

  async getUserWithLikes(id: number): Promise<IUser | null> {
    return (await this.repository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likes', 'likes')
      .leftJoinAndSelect('likes.post', 'post')
      .where({ id })
      .getOne()
  }

  async getUserWithFavorites(id: number): Promise<IUser | null> {
    return await (await this.repository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favorites', 'favorites')
      .leftJoinAndSelect('favorites.post', 'post')
      .where({ id })
      .getOne()
  }

  async getUserWithRole(id: number, role: RoleTypes[]): Promise<IUser | null> {
    const user = (await this.repository).createQueryBuilder('user').where({ id }).andWhere({ role }).getOne()

    return user
  }

  async findUserByUsername(username: string): Promise<IUser | null> {
    return (await this.repository)
      .createQueryBuilder('user')
      .addSelect('user.password_hash')
      .where({ username })
      .getOne()
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return (await this.repository).createQueryBuilder('user').addSelect('user.password_hash').where({ email }).getOne()
  }
}
