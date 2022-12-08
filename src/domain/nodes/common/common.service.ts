import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';

@Injectable()
export class CommonRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  /**
   * Find a node base on the node's id on database
   * @param node The node to look for
   * @param id The name of the node to look for
   */
  async findOneById(node: string, id: string) {
    const query = this.neo4jService.initQuery();

    const tag = node.toLocaleLowerCase();

    const result = await query.matchNode(tag, node, { id }).return(tag).run();

    return result;
  }

  /**
   * Find a node base on the node's name on database
   * @param node The node to look for
   * @param name The name of the node to look for
   */
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

  /**
   * Create a node on database
   * @param node The node to create
   * @param data The properties data of the node
   */
  async create<T>(node: string, data: T) {
    const query = this.neo4jService.initQuery();

    const tag = node.toLocaleLowerCase();

    const result = await query
      .createNode(tag, node, {
        ...data,
      })
      .return(tag)
      .run();

    return result;
  }
}
