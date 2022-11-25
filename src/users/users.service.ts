import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/domain/nodes/user/user.service';
import { UpdateUserDto } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const result = await this.userRepository.findAll();

    return result.map((item) => new UserEntity(item.user.properties));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const [data] = await this.userRepository.findOneById(id);

    if (!data)
      throw new NotFoundException(`The user with the id #${id} is not found `);

    const [updataData] = await this.userRepository.update(id, updateUserDto);

    const updatedUserData = updataData.user.properties;

    return new UserEntity(updatedUserData);
  }

  async delete(id: string) {
    const result = await this.userRepository.findOneById(id);

    if (!result.length)
      throw new NotFoundException(`The user with the id #${id} is not found `);

    await this.userRepository.delete(id);

    return new UserEntity(result[0].user.properties);
  }
}
