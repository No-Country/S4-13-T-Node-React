import { CreateUserDTO, RoleTypes, UpdateUser } from '../Interfaces/user.interfaces'
import { UserRepository } from '../Repository/user.repository'
import { BaseService } from './base.service'

export class UserService extends BaseService {
  private readonly alias: string
  constructor(private readonly userRepository: UserRepository = new UserRepository()) {
    super()
    this.alias = 'user'
  }

  async createUser(user: CreateUserDTO) {
    const newUser = (await this.userRepository.repository).create(user)
    if (user.password) {
      newUser.password = await this.encrypt(user.password)
    }
    return await this.userRepository.create(newUser)
  }

  async findAll(page: number = 1, size: number = 100, sort: string) {
    const [users, total] = await this.userRepository.list(this.alias, undefined, { size, page, sort })
    const last_page = Math.ceil(total / size)
    return [users, total, last_page]
  }

  async findById(id: number) {
    return await this.userRepository.get(id, this.alias)
  }

  async findByIdWithPosts(id: number, page: number, size: number, sort: string) {
    return await this.userRepository.getUserWithPosts(id, { page, size, sort })
  }

  async findByIdWithFavorites(id: number, page: number, size: number, sort: string) {
    return await this.userRepository.getUserWithFavorites(id, { page, size, sort })
  }

  async findByIdWithLikes(id: number, page: number, size: number, sort: string) {
    return await this.userRepository.getUserWithLikes(id, { page, size, sort })
  }

  async findByIdWithRole(id: number, role: RoleTypes[]) {
    return await this.userRepository.getUserWithRole(id, role)
  }

  async update(id: number, user: UpdateUser) {
    if (user.password) {
      const hash = await this.encrypt(user.password)
      user.password = hash
    }
    const updated = await this.userRepository.update(id, user)
    if (updated.affected === 0) {
      return { error: 'User not found or is deleted.' }
    }
    return updated.raw
  }

  async remove(id: number) {
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
