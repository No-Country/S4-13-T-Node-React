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

  async list(alias: string, relation?: string, query?: QueryList): Promise<[T[], number]> {
    try {
      const { size, page, sort } = query!
      console.log(relation, alias)

      const builder = (await this.repository).createQueryBuilder(alias)

      if (relation) {
        builder.leftJoinAndSelect(`${alias}.${relation}`, relation)
      }

      builder
        .offset((page - 1) * size)
        .limit(size)
        .orderBy(`${alias}.created_at`, sort.toUpperCase())

      const [list, total] = await builder.getManyAndCount()
      return [list, total]
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }

  async get(id: number, alias: string, relation?: string, query?: Query | undefined): Promise<T | null> {
    try {
      const builder = (await this.repository).createQueryBuilder(alias)

      if (relation) {
        builder.leftJoinAndSelect(`${alias}.${relation}`, relation)
      }

      builder.where({ id })

      return await builder.getOne()
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
