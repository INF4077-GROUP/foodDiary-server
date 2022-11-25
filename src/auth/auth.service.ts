import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/domain/nodes/user/user.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(authDto: AuthDto) {
    const [nameAlreadyExist] = await this.userRepository.findOneByName(
      authDto.name,
    );

    if (nameAlreadyExist)
      throw new ForbiddenException('This username is already taken.');

    const { password, ...data } = authDto;

    const hash = await argon2.hash(password);

    const userData = {
      ...data,
      id: uuid(),
      hash,
    };

    const result = await this.userRepository.create(userData);

    const user = result[0].user.properties;

    return user;
  }

  async login(authDto: AuthDto) {
    const [data] = await this.userRepository.findOneByName(authDto.name);

    if (!data)
      throw new NotFoundException('User with the given name is not found');

    const user = data.user.properties;

    const isPasswordMatched = await argon2.verify(user.hash, authDto.password);

    if (!isPasswordMatched)
      throw new ForbiddenException('The given password is not correspond');

    return user;
  }
}
