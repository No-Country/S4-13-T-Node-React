import { IUser, IUserDTO } from '../Interfaces/user.interfaces'
import { UserRepository } from '../Repository/user.repository'

export class UserService {
  private readonly alias: string
  private readonly relation_likes: string
  private readonly relation_favorites: string
  constructor(private readonly userRepository: UserRepository = new UserRepository()) {
    this.alias = 'user'
    this.relation_likes = 'likes'
    this.relation_favorites = 'favorites'
  }

  async createUser(user: IUser) {
    return await this.userRepository.create(user)
  }

  async getUsers(page: number = 1, size: number = 100, sort: string) {
    const [users, total] = await this.userRepository.list(this.alias, undefined, { size, page, sort })
    const last_page = Math.ceil(total / size)
    return [users, total, last_page]
  }

  async getUser(id: number) {
    return await this.userRepository.get(id, this.alias)
  }

  async getUserWithFavorites(id: number) {
    return await this.userRepository.getUserWithFavorites(id)
  }

  async getUserWithLikes(id: number) {
    return await this.userRepository.getUserWithLikes(id)
  }

  async updateUser(id: number, data: IUserDTO) {
    const updated = await this.userRepository.update(id, data)
    if (updated.affected === 0) {
      return { error: 'User not found or is deleted.' }
    }
    return updated.raw
  }

  async removeUser(id: number) {
    const deleted = await this.userRepository.remove(id)
    if (deleted.affected === 0) {
      return { error: 'User not found or already deleted.' }
    }
    return deleted.raw
  }
}
