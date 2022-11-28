import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JWT } from '../constants';
import { PayloadType } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_TOKEN'),
    });
  }

  async validate(payload: PayloadType) {
    const user = await this.authService.jwtValidateUser(payload.sub);

    if (!user) throw new UnauthorizedException('acces denied.');

    return user;
  }
}
