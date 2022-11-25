import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { USER_NODE } from 'src/users/users.constant';

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

  async delete(id: string) {
    const query = this.neo4jService.initQuery();

    return await query
      .matchNode(UserRepository.user, USER_NODE, { id })
      .delete(UserRepository.user)
      .run();
  }
}
