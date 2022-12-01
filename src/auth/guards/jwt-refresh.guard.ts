import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH } from '../constants';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(JWT_REFRESH) {
  constructor() {
    super();
  }
}
