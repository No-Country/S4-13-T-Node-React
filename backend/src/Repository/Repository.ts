import { DatabaseRepository, Id, Query } from '@src/Interfaces/repository.interface'

export abstract class Repository<T> implements DatabaseRepository<T> {
  constructor(protected readonly entity: any) {
    // Entity necesita un tipado pero no se cual tiene que ir, hay que buscarlo
    this.entity = entity
  }
  async create(data: Partial<T>, query?: Query | undefined): Promise<T> {
    try {
      const newData = await this.entity.create(data)
      await newData.save()
      return newData
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async list(query?: Query | undefined): Promise<T[]> {
    try {
      return await this.entity.find()
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async get(id: Id, query?: Query | undefined): Promise<T> {
    try {
      return await this.entity.findOneById({ id })
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async update(id: Id, data: Partial<T>, query?: Query | undefined): Promise<T> {
    try {
      return await this.entity.update({ id }, data)
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async remove(id: Id, query?: Query | undefined): Promise<T> {
    try {
      return await this.entity.softDelete({ id })
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
}
