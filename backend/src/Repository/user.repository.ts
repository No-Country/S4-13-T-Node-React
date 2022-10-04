import { Query } from 'typeorm/driver/Query'
import { User } from '../Entities/user.entity'
import { IUser } from '../Interfaces/user.interfaces'
import { BaseRepository } from './base.repository'

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User)
  }

  async getUserWithLikes(id: number, query?: Query | undefined): Promise<IUser | null> {
    const builder = (await this.repository).createQueryBuilder('user')

    builder.leftJoinAndSelect('user.likes', 'likes')
    builder.leftJoinAndSelect('likes.post', 'post')

    builder.where({ id })

    return await builder.getOne()
  }

  async getUserWithFavorites(id: number, query?: Query | undefined): Promise<IUser | null> {
    const builder = (await this.repository).createQueryBuilder('user')

    builder.leftJoinAndSelect('user.favorites', 'favorites')
    builder.leftJoinAndSelect('favorites.post', 'post')

    builder.where({ id })

    return await builder.getOne()
  }
}
