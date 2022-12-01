import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JWT_REFRESH } from '../constants';
import { PayloadType } from '../types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH,
) {
  constructor(config: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: PayloadType) {
    const bearerRtToken = req.headers.authorization
      .replace('Bearer', '')
      .trim();

    const user = await this.authService.jwtRefreshValidateUser(
      payload.sub,
      bearerRtToken,
    );

    if (!user) throw new UnauthorizedException('access denied.');

    return { ...user, bearerRtToken };
  }
}
