import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { ConfigServer } from './Config/config'
import { PostRouter } from './Routes/post.routes'
import { UserRouter } from './Routes/user.routes'
import { LoginStrategy } from './Strategies/login.strategy'
import { JwtStrategy } from './Strategies/jwt.strategy'
import { AuthRouter } from './Routes/auth.routes'
import { GoogleStrategy } from './Strategies/google.strategy'
import { FacebookStrategy } from './Strategies/facebook.strategy'

export class Server extends ConfigServer {
  public app: express.Application = express()
  private port: number = this.getNumberEnv('PORT')

  constructor() {
    super()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.passportUse()

    this.dbConnect().then(() => {
      console.log('Database connected.')
    })

    this.app.get('/', (req, res) => {
      res.send('<a href="/login/google">Google</a><a href="/login/facebook">Facebook</a>') // Para probar el login de google
    })

    this.app.use(morgan('dev'))
    this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

    this.app.use(this.routers())
    this.listen()
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use, new GoogleStrategy().use, new FacebookStrategy().use]
  }

  routers(): express.Router[] {
    return [new PostRouter().router, new UserRouter().router, new AuthRouter().router]
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('Server listening on port', this.port)
    })
  }
}
