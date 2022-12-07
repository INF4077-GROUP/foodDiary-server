import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';

@Injectable()
export class CommonRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findOneById(node: string, id: string) {
    const query = this.neo4jService.initQuery();

    const tag = node.toLocaleLowerCase();

    const result = await query.matchNode(tag, node, { id }).return(tag).run();

    return result;
  }

  async findOneByName(node: string, name: string) {
    const query = this.neo4jService.initQuery();

    const tag = node.toLocaleLowerCase();

    const result = await query
      .matchNode(tag, node, {
        name,
      })
      .return(tag)
      .run();

    return result;
  }

  async create<T>(node: string, userData: T) {
    const query = this.neo4jService.initQuery();

    const tag = node.toLocaleLowerCase();

    const result = await query
      .createNode(tag, node, {
        ...userData,
      })
      .return(tag)
      .run();

    return result;
  }
}
