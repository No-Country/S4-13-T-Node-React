import { IBaseDTO } from '../Interfaces/base.interfaces'
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity implements IBaseDTO {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
