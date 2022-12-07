import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { USER_NODE, VEGETABLE_NODE } from 'src/common/constants';
import { CommonRepository } from '../common/common.service';
import { ConsumeType, VegetableType } from './types';

@Injectable()
export class VegetableRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly commonRepository: CommonRepository,
  ) {}

  async preloadVegetable(vegetableData: VegetableType) {
    const vegetableName = vegetableData.name.toLocaleLowerCase();

    const [vegetableExixt] = await this.commonRepository.findOneByName(
      VEGETABLE_NODE,
      vegetableName,
    );

    if (!vegetableExixt)
      await this.commonRepository.create(VEGETABLE_NODE, vegetableData);
  }

  async createUserConsumeVegetable(
    userId: string,
    vegetableName: string,
    properties: ConsumeType,
  ) {
    const query = this.neo4jService.initQuery();

    const userLabel = USER_NODE.toLocaleLowerCase();
    const vegetableLabel = VEGETABLE_NODE.toLocaleLowerCase();

    const result = await query
      .matchNode(userLabel, USER_NODE, { id: userId })
      .matchNode(vegetableLabel, VEGETABLE_NODE, { name: vegetableName })
      .raw(
        `
        CREATE (${userLabel})-[relation:CONSUME{date: ${properties.date}}]->(${vegetableLabel})
      `,
      )
      .return('relation')
      .run();

    return result;
  }
}
