import { DatabaseRepository, Id, Query } from '@src/Interfaces/repository.interface'
import { BaseEntity, FindOptionsWhere, ObjectType, Repository as GenericRepository, UpdateResult } from 'typeorm'

export abstract class Repository<Entity extends BaseEntity> implements DatabaseRepository<Entity> {
  constructor(protected readonly repository: GenericRepository<Entity>) {
    this.repository = repository
  }
  async create(data: Entity, query?: Query | undefined): Promise<Entity> {
    try {
      const newData = this.repository.create(data)
      await newData.save()
      return newData
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async list(query?: Query | undefined): Promise<Entity[]> {
    try {
      return await this.repository.find()
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async get(id: number, query?: Query | undefined): Promise<Entity | null> {
    try {
      const options: FindOptionsWhere<ObjectType<Entity>> = { id }
      return await this.repository.findOneBy(options)
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async update(id: any, data: any, query?: Query | undefined): Promise<UpdateResult> {
    try {
      return await this.repository.update(id, data)
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  async remove(id: Id, query?: Query | undefined): Promise<UpdateResult> {
    try {
      return await this.repository.softDelete(id)
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
}
