import { BaseEntity } from '../Entities/Base.entity'
import { DatabaseRepository, Id, Query, QueryList } from '../Interfaces/repository.interface'
import { FindOptionsWhere, ObjectType, Repository as GenericRepository, UpdateResult } from 'typeorm'

export abstract class Repository<Entity extends BaseEntity> implements DatabaseRepository<Entity> {
  constructor(protected readonly repository: GenericRepository<Entity>) {
    this.repository = repository
  }

  async create(data: Entity, query?: Query | undefined): Promise<Entity> {
    try {
      const newData = this.repository.create(data)
      await this.repository.save(newData)
      return newData
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }

  async list(query: QueryList): Promise<Entity[]> {
    try {
      const { size, page, sort } = query

      const builder = this.repository.createQueryBuilder()

      builder.offset((page - 1) * size).limit(size)
      builder.orderBy('created_at', sort.toUpperCase())

      return await builder.getMany()
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
