import * as dotenv from 'dotenv'
import path from 'path'
import { DataSource } from 'typeorm'

export abstract class ConfigServer {
  public NODE_ENV

  constructor() {
    dotenv.config()
    this.NODE_ENV = this.getEnvironment('NODE_ENV')
  }

  public getEnvironment(k: string): string | undefined {
    return process.env[k]
  }

  public getNumberEnv(k: string): number {
    return Number(this.getEnvironment(k))
  }

  public get nodeEnv(): string | undefined {
    return this.getEnvironment('NODE_ENV')?.trim() || ''
  }

  public createPathEnv(path: string): string {
    const arrEnv: string[] = ['env']

    if (path.length > 0) {
      const stringToArray = path.split('.')
      arrEnv.unshift(...stringToArray)
    }
    return '.' + arrEnv.join('.')
  }

  async dbConnect(): Promise<DataSource> {
    try {
      return await this.typeoORMConfig.initialize()
    } catch (error) {
      throw new Error(`Unexpected Server Error` + error)
    }
  }

  public get typeoORMConfig(): DataSource {
    const pathEntities = path.join(__dirname, '../**/*.entity{.ts,.js}')
    return new DataSource({
      type: 'postgres',
      host: this.getEnvironment('DB_HOST'),
      username: this.getEnvironment('DB_USERNAME'),
      password: this.getEnvironment('DB_PASSWORD'),
      port: this.getNumberEnv('DB_PORT'),
      database: this.getEnvironment('DB_DATABASE'),
      entities: [pathEntities],
      synchronize: true,
      // logging:true,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
}
