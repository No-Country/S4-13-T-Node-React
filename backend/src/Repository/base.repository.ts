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
    return (await this.repository).save(data)
  }

  async list(alias: string, relation?: string, query?: QueryList): Promise<[T[], number]> {
    const { size, page, sort } = query!

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
  }

  async get(id: number, alias: string, relation?: string, query?: Query | undefined): Promise<T | null> {
    const builder = (await this.repository).createQueryBuilder(alias)

    if (relation) {
      builder.leftJoinAndSelect(`${alias}.${relation}`, relation)
    }

    return await builder.where({ id }).getOne()
  }

  async update(id: any, data: any, query?: Query | undefined): Promise<UpdateResult> {
    const builder = await (await this.repository)
      .createQueryBuilder()
      .update(data)
      .where({ id, deleted_at: IsNull() })
      .returning('*')
      .execute()

    return builder
  }

  async remove(id: Id, query?: Query | undefined): Promise<UpdateResult> {
    const builder = await (await this.repository)
      .createQueryBuilder()
      .softDelete()
      .where({ id, deleted_at: IsNull() })
      .returning('*')
      .execute()
    return builder
  }
}
