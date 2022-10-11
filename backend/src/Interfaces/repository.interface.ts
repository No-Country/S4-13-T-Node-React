import { BaseEntity } from '../Entities/base.entity'
import { UpdateResult } from 'typeorm'

export type Query = Record<string, any>

export interface QueryList {
  size: number
  page: number
  sort: any
  word?: string
  property?: string
}

export type Id = number

export interface DatabaseRepository<Entity extends BaseEntity> {
  create(data: Entity, query?: Query): Promise<Entity>
  list(alias: string, relation?: string, query?: Query | QueryList): Promise<[Entity[], number]>
  get(id: Id, alias: string, relation?: string, query?: Query): Promise<Entity | null>
  update(id: Id, data: Partial<Entity>, query?: Query): Promise<UpdateResult>
  remove(id: Id, query?: Query): Promise<UpdateResult>
}
