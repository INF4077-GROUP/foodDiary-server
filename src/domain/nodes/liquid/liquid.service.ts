import { Inject, Injectable } from '@nestjs/common';
import { DrinkType, LiquidType } from './types';

import { Neo4jService } from 'neo4j-module';
import { CommonRepository } from '../common/common.service';
import { LIQUID_NODE, USER_NODE } from 'src/common/constants/nodes';

Injectable();
export class LiquidRepository {
  constructor(
    @Inject(Neo4jService) private readonly neo4jService: Neo4jService,
    @Inject(CommonRepository)
    private readonly commonRepository: CommonRepository,
  ) {}

  async preloadLiquid(liquidData: LiquidType) {
    const liquidName = liquidData.name.toLocaleLowerCase();

    const [liquidExist] = await this.commonRepository.findOneByName(
      LIQUID_NODE,
      liquidName,
    );

    if (!liquidExist)
      this.commonRepository.create<LiquidType>(LIQUID_NODE, liquidData);
  }

  async createUserDrinkLiquid(
    userId: string,
    liquidName: string,
    drinkData: DrinkType,
  ) {
    const query = this.neo4jService.initQuery();

    const userLabel = USER_NODE.toLocaleLowerCase();
    const liquidLabel = LIQUID_NODE.toLocaleLowerCase();

    const result = await query
      .matchNode(userLabel, USER_NODE, { id: userId })
      .matchNode(liquidLabel, LIQUID_NODE, { name: liquidName })
      .raw(
        `CREATE (${userLabel})-[relation:DRINK{date: '${drinkData.date}', quantity: ${drinkData.quantity}}]->(${liquidLabel})`,
      )
      .return('relation')
      .run();

    return result;
  }
}
