import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { UpdateUserDto } from 'src/users/dto';
import * as argon2 from 'argon2';
import { USER_NODE } from 'src/common/constants';

@Injectable()
export class UserRepository {
  private static readonly user = USER_NODE.toLocaleLowerCase();

  constructor(
    @Inject(Neo4jService) private readonly neo4jService: Neo4jService,
  ) {}

  async findAll() {
    const query = this.neo4jService.initQuery();

    const result = await query
      .matchNode(UserRepository.user, USER_NODE)
      .return(UserRepository.user)
      .run();

    return result;
  }

  async findOneById(id: string) {
    const query = this.neo4jService.initQuery();

    const result = await query
      .matchNode(UserRepository.user, USER_NODE, { id })
      .return(UserRepository.user)
      .run();

    return result;
  }

  async findOneByName(name: string) {
    const query = this.neo4jService.initQuery();

    const result = await query
      .matchNode(UserRepository.user, USER_NODE, {
        name,
      })
      .return(UserRepository.user)
      .run();

    return result;
  }

  async create<T>(userData: T) {
    const query = this.neo4jService.initQuery();

    const result = await query
      .createNode(UserRepository.user, USER_NODE, {
        ...userData,
      })
      .return(UserRepository.user)
      .run();

    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const query = this.neo4jService.initQuery();

    const { name, email, dateOfBirth, description } = updateUserDto;

    const result = await query
      .matchNode(UserRepository.user, USER_NODE, { id })
      .raw(
        `
          SET user.name = '${name}'
          SET user.email = '${email}'
          SET user.dateOfBirth = ${dateOfBirth}
          SET user.description = '${description}'
          SET user.updatedAt = ${Date.now()}
      `,
      )
      .return(UserRepository.user)
      .run();

    return result;
  }

  async updateAvatar(id: string, avatarUrl: string) {
    const query = this.neo4jService.initQuery();

    const result = await query
      .matchNode(UserRepository.user, USER_NODE, { id })
      .raw(
        `
        SET user.avatar = '${avatarUrl}'
        SET user.updatedAt = ${Date.now()}
      `,
      )
      .return(UserRepository.user)
      .run();

    return result;
  }

  async delete(id: string) {
    const query = this.neo4jService.initQuery();

    return await query
      .matchNode(UserRepository.user, USER_NODE, { id })
      .delete(UserRepository.user)
      .run();
  }

  async updateHashedRefreshToken(id: string, rtToken: string) {
    const query = this.neo4jService.initQuery();

    let hashedRt = '';

    if (rtToken) hashedRt = await argon2.hash(rtToken);

    return await query
      .matchNode(UserRepository.user, USER_NODE, { id })
      .raw(`SET user.hashedRt = '${hashedRt}'`)
      .return(UserRepository.user)
      .run();
  }
}
