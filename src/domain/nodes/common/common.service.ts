import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';

@Injectable()
export class CommonService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findOne(id: string) {
    return true;
  }
}
