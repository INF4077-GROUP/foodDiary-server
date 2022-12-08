import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { CommonRepository } from '../common/common.service';

@Injectable()
export class SickRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly commonrepository: CommonRepository,
  ) {
    console.log('sick repository');

    console.log({ neo4jService });
    console.log({ commonrepository });
  }
}
