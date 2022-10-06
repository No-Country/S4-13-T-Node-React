import { AuthService } from '../Services/auth.service'
import { PassportUse } from '../Utils/passport.use'
import {
  Strategy as FacebookStr,
  VerifyFunctionWithRequest,
  StrategyOptionWithRequest,
  Profile,
} from 'passport-facebook'
import { Request } from 'express'
import { UserService } from '../Services/user.service'

const userService: UserService = new UserService()

export class FacebookStrategy extends AuthService {
  async validate(req: Request, accesToken: string, refreshToken: string, profile: Profile, done: any) {
    const { displayName, id } = profile
    const user_found = await userService.findByFacebookID(id)

    if (user_found) {
      req.user = user_found
      return done(null, user_found)
    } else {
      const user = await userService.createUser({
        facebook_id: id,
        username: `${displayName.replace(/ /g, '.')}.${id}`,
      })
      req.user = user
      return done(null, user)
    }
  }

  get use() {
    return PassportUse<FacebookStr, StrategyOptionWithRequest, VerifyFunctionWithRequest>(
      'facebook',
      FacebookStr,
      {
        clientID: this.getEnvironment('FACEBOOK_APP_ID')!,
        clientSecret: this.getEnvironment('FACEBOOK_APP_SECRET')!,
        callbackURL: 'http://localhost:8080/login/facebook/callback',
        passReqToCallback: true,
      },
      this.validate
    )
  }
}
