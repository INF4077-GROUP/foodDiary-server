import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register() {
    return { message: 'register user' };
  }

  async login() {
    return { message: 'login user' };
  }
}
