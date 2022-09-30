import { BaseEntity } from '../Entities/Base.entity'
import { UpdateResult } from 'typeorm'

export type Query = Record<string, any>

export interface QueryList {
  size: number
  page: number
  sort: any
}

export type Id = number

export interface DatabaseRepository<Entity extends BaseEntity> {
  create(data: Entity, query?: Query): Promise<Entity>
  list(query?: Query | QueryList): Promise<Entity[]>
  get(id: Id, query?: Query): Promise<Entity | null>
  update(id: Id, data: Partial<Entity>, query?: Query): Promise<UpdateResult>
  remove(id: Id, query?: Query): Promise<UpdateResult>
}
