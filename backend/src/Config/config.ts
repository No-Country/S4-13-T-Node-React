import * as dotenv from 'dotenv'
dotenv.config()

export const ENV = {
  PORT: Number(process.env.PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_DATABASE: process.env.DB_DATABASE,
  ARG1: process.argv[2],
}
