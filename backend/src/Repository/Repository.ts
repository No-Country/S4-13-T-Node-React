import { DataSource } from 'typeorm';

export abstract class Repository<T> {
  constructor(protected readonly entity: any) {
    this.entity = entity;
  }

  async createObject(object: typeof this.entity) {
    try {
      const newObject = await this.entity.create(object);
      await newObject.save();
      return newObject;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
