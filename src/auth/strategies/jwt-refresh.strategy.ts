import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from 'src/domain/nodes/user/user.service';
import { JWT_REFRESH } from '../constants';
import { PayloadType } from '../types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH,
) {
  constructor(config: ConfigService, private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: PayloadType) {
    const result = await this.userRepository.findOneById(payload.sub);

    const user = result[0].user.properties;

    if (!user || !user.hashedRt) throw new UnauthorizedException();

    const bearerRt = req.headers.authorization.replace('Bearer', '').trim();

    delete user.hash;
    delete user.hashedRt;

    const userWithBearerRt = { ...user, bearerRt };

    return userWithBearerRt;
  }
}
