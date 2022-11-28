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
import { Tokens } from './types';
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
      id: uuid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),

      name: data.name,
      email: '',
      dateOfBirth: 0,
      description: '',

      hash,
      hashedRt: null,
    };

    const result = await this.userRepository.create(userData);

    const user = result[0].user.properties;

    const tokens = await this.generateTokens(user.id, user.name);

    const hashedRt = await argon2.hash(tokens.refresh_token);

    await this.userRepository.updateHashedRefreshToken(user.id, hashedRt);

    return tokens;
  }

  async login(authDto: AuthDto): Promise<Tokens> {
    const [data] = await this.userRepository.findOneByName(authDto.name);

    if (!data)
      throw new NotFoundException('User with the given name is not found.');

    const user = data.user.properties;

    const isPasswordMatched = await argon2.verify(user.hash, authDto.password);

    if (!isPasswordMatched)
      throw new ForbiddenException('The given password is not correspond.');

    const tokens = await this.generateTokens(user.id, user.name);

    const hashedRt = await argon2.hash(tokens.refresh_token);

    await this.userRepository.updateHashedRefreshToken(user.id, hashedRt);

    return tokens;
  }

  async jwtValidateUser(userId: string) {
    const [userData] = await this.userRepository.findOneById(userId);

    if (!userData) return null;

    const user = userData.user.properties;

    delete user.hash;
    delete user.hashedRt;

    return user;
  }

  // helpers functions
  private async generateTokens(
    userId: string,
    username: string,
  ): Promise<Tokens> {
    const payload = {
      sub: userId,
      name: username,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN'),
        expiresIn: '3d',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN'),
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }
}
