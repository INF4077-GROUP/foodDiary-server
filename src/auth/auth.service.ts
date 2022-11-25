import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/nodes/user/user.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(authDto: AuthDto) {
    const { name } = authDto;

    const [nameAlreadyExist] = await this.userRepository.findOneByName(name);

    if (nameAlreadyExist)
      throw new ForbiddenException('This username is already taken.');

    const hash = await argon2.hash(authDto.password);

    const result = await this.userRepository.create({ name, hash });

    const user = result[0].user.properties;

    return user;
  }

  async login() {
    return { message: 'login user' };
  }
}
