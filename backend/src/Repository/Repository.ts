import { DatabaseRepository, Id, Query } from '@src/interfaces/repository.interface'

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
  update(id: Id, data: Partial<T>, query?: Query | undefined): Promise<T> {
    try {
      throw new Error('Nothing implemented')
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }
  remove(id: Id, query?: Query | undefined): Promise<T> {
    try {
      throw new Error('Nothing implemented')
    } catch (error) {
      throw new Error(`Error unexpected: ${error}`)
    }
  }

  // async createObject(object: Partial<T>) {
  //   try {
  //     const newObject = await this.entity.create(object);
  //     await newObject.save();
  //     return newObject;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }
  // async getObjects() {
  //   // Este getObjects tiene que retornar los objectos con paginación.
  //   try {
  //     return await this.entity.find();
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async getObject(id: number) {
  //   try {
  //     return await this.entity.findOneById({ id });
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
