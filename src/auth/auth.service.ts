import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/domain/nodes/user/user.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

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

    const { id: userId, name: username } = result[0].user.properties;

    const token = await this.generateToken(userId, username);

    return token;
  }

  async login(authDto: AuthDto) {
    const [data] = await this.userRepository.findOneByName(authDto.name);

    if (!data)
      throw new NotFoundException('User with the given name is not found');

    const user = data.user.properties;

    const isPasswordMatched = await argon2.verify(user.hash, authDto.password);

    if (!isPasswordMatched)
      throw new ForbiddenException('The given password is not correspond');

    const token = await this.generateToken(user.id, user.name);

    return token;
  }

  private async generateToken(userId: string, username: string) {
    const payload = {
      sub: userId,
      name: username,
    };

    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '3d',
    });

    return { access_token: token };
  }
}
