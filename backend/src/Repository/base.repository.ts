import { BaseEntity } from '../Entities/base.entity'
import { DatabaseRepository, Id, Query, QueryList } from '../Interfaces/repository.interface'
import { EntityTarget, FindOptionsWhere, IsNull, ObjectType, Repository, UpdateResult } from 'typeorm'
import { ConfigServer } from '../Config/config'

export class BaseRepository<T extends BaseEntity> extends ConfigServer implements DatabaseRepository<T> {
  public repository: Promise<Repository<T>>
  constructor(private entity: EntityTarget<T>) {
    super()

    this.repository = this.initRepository()
  }

  async initRepository<T>() {
    const getConn = await this.dbConnect()
    return getConn.getRepository(this.entity)
  }

  async create(data: T, query?: Query | undefined): Promise<T> {
    try {
      return (await this.repository).save(data)
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }

  async list(query: QueryList): Promise<[T[], number]> {
    try {
      const { size, page, sort } = query

      const builder = (await this.repository).createQueryBuilder()

      builder.offset((page - 1) * size).limit(size)
      builder.orderBy('created_at', sort.toUpperCase())

      const [list, total] = await builder.getManyAndCount()
      return [list, total]
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }

  async get(id: number, query?: Query | undefined): Promise<T | null> {
    try {
      const options: FindOptionsWhere<ObjectType<T>> = { id }
      return await (await this.repository).findOneBy(options)
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }

  async update(id: any, data: any, query?: Query | undefined): Promise<UpdateResult> {
    try {
      const builder = await (await this.repository)
        .createQueryBuilder()
        .update(data)
        .where({ id, deleted_at: IsNull() })
        .returning('*')
        .execute()

      return builder
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }

  async remove(id: Id, query?: Query | undefined): Promise<UpdateResult> {
    try {
      const builder = await (await this.repository)
        .createQueryBuilder()
        .softDelete()
        .where({ id, deleted_at: IsNull() })
        .returning('*')
        .execute()
      return builder
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
}
