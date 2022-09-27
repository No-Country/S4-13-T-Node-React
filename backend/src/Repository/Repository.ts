export abstract class Repository<T> {
  constructor(protected readonly entity: any) {
    // Entity necesita un tipado pero no se cual tiene que ir, hay que buscarlo
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
  async getObjects() {
    // Este getObjects tiene que retornar los objectos con paginación.
    try {
      return await this.entity.find();
    } catch (error) {
      return error;
    }
  }

  async getObject(id: number) {
    try {
      return await this.entity.findOneById({ id });
    } catch (error) {
      return error;
    }
  }
}
