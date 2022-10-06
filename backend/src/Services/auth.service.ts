import { ConfigServer } from '../Config/config'
import { UserService } from './user.service'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { IUser } from '../Interfaces/user.interfaces'
import { PayloadToken } from '../Interfaces/auth.interface'

export class AuthService extends ConfigServer {
  constructor(private readonly userService: UserService = new UserService(), private readonly jwtInstance = jwt) {
    super()
  }

  public async validateUser(username: string, password: string): Promise<IUser | null> {
    const userByUsername = await this.userService.findByUsername(username)
    const userByEmail = await this.userService.findByEmail(username)

    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password!)
      if (isMatch) {
        return userByUsername
      }
    }

    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password!)
      if (isMatch) {
        return userByEmail
      }
    }

    return null
  }

  sing(payload: jwt.JwtPayload, jwt_secret: any) {
    return this.jwtInstance.sign(payload, jwt_secret, { expiresIn: '15m' })
  }

  public async generateJWT(user: IUser): Promise<{ access_token: string; user: IUser }> {
    const userConsult = await this.userService.getUserWithRole(user.id, user.role!)

    const payload: PayloadToken = {
      role: userConsult!.role!,
      sub: userConsult!.id,
    }

    if (userConsult) {
      user.password = 'No permission.'
    }

    return {
      access_token: this.sing(payload, this.getEnvironment('JWT_SECRET')),
      user,
    }
  }
}
