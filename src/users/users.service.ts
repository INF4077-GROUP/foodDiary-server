import { Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_ERROR_MESSAGE } from 'src/common/common.constant';
import { CreateUserDto } from './dto';
import { v4 as uuid } from 'uuid';
import { UserRepository } from 'src/domain/nodes/user/user.service';
import { UserInterface } from './interfaces';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const result = await this.userRepository.findAll();

    return result.map((item) => new UserEntity(item.user.properties));
  }

  async findOneById(id: string) {
    const result = await this.userRepository.findOneById(id);

    if (!result.length)
      throw new NotFoundException(`The user with the id #${id} is not found `);

    return new UserEntity(result[0].user.properties);
  }

  async create(createUserDto: CreateUserDto) {
    const userInterface: UserInterface = {
      ...createUserDto,
      id: uuid(),
      birthday: Date.now(),
    };

    const result = await this.userRepository.create(userInterface);

    if (result.length === 0) throw DEFAULT_ERROR_MESSAGE;

    const userData = result[0].user.properties;

    return new UserEntity(userData);
  }

  async delete(id: string) {
    const result = await this.userRepository.findOneById(id);

    if (!result.length)
      throw new NotFoundException(`The user with the id #${id} is not found `);

    await this.userRepository.delete(id);

    return new UserEntity(result[0].user.properties);
  }
}
