import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { ConfigServer } from './Config/config'
import { PostRouter } from './Routes/post.route'

export class Server extends ConfigServer {
  public app: express.Application = express()
  private port: number = this.getNumberEnv('PORT')

  constructor() {
    super()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.dbConnect().then(() => {
      console.log('Database connected.')
    })

    this.app.use(morgan('dev'))
    this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

    this.app.use(this.routers())
    this.listen()
  }

  routers(): express.Router[] {
    return [new PostRouter().router]
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('Server listening on port', this.port)
    })
  }
}
