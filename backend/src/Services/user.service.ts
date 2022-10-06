import { CreateUserDTO, RoleTypes, UpdateUser } from '../Interfaces/user.interfaces'
import { UserRepository } from '../Repository/user.repository'
import * as bcrypt from 'bcryptjs'

export class UserService {
  private readonly alias: string
  constructor(private readonly userRepository: UserRepository = new UserRepository()) {
    this.alias = 'user'
  }

  async createUser(user: CreateUserDTO) {
    const newUser = (await this.userRepository.repository).create(user)
    if (user.password) {
      const hash = await bcrypt.hash(newUser.password!, 10)
      newUser.password = hash
    }
    return await this.userRepository.create(newUser)
  }

  async getUsers(page: number = 1, size: number = 100, sort: string) {
    const [users, total] = await this.userRepository.list(this.alias, undefined, { size, page, sort })
    const last_page = Math.ceil(total / size)
    return [users, total, last_page]
  }

  async getUser(id: number) {
    return await this.userRepository.get(id, this.alias)
  }

  async getUserWithPosts(id: number, page: number, size: number, sort: string) {
    return await this.userRepository.getUserWithPosts(id, { page, size, sort })
  }

  async getUserWithFavorites(id: number, page: number, size: number, sort: string) {
    return await this.userRepository.getUserWithFavorites(id, { page, size, sort })
  }

  async getUserWithLikes(id: number, page: number, size: number, sort: string) {
    return await this.userRepository.getUserWithLikes(id, { page, size, sort })
  }

  async getUserWithRole(id: number, role: RoleTypes[]) {
    return await this.userRepository.getUserWithRole(id, role)
  }

  async updateUser(id: number, user: UpdateUser) {
    if (user.password) {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
    }
    const updated = await this.userRepository.update(id, user)
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

  async findByUsername(username: string) {
    return await this.userRepository.findUserByUsername(username)
  }

  async findByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email)
  }

  async findByFacebookID(id: string) {
    return await this.userRepository.findUserByFacebookID(id)
  }
}
