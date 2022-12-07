import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { FOOD_NODE, USER_NODE } from 'src/common/constants';
import { CommonRepository } from '../common/common.service';
import { EatType, FoodType } from './types';

@Injectable()
export class FoodRepository {
  private static readonly food = FOOD_NODE.toLocaleLowerCase();

  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly commonRepository: CommonRepository,
  ) {}

  async preloadFood(foodData: FoodType) {
    const foodName = foodData.name.toLocaleLowerCase();

    const [foodExist] = await this.commonRepository.findOneByName(
      FOOD_NODE,
      foodName,
    );

    if (!foodExist)
      await this.commonRepository.create(FOOD_NODE, { name: foodName });
  }

  async createUserEatFood(
    userId: string,
    foodData: FoodType,
    eatData: EatType,
  ) {
    const query = this.neo4jService.initQuery();

    const userLabel = USER_NODE.toLocaleLowerCase();
    const foodLabel = FOOD_NODE.toLocaleLowerCase();

    const { date, eatingNb } = eatData;

    const result = await query
      .matchNode(userLabel, USER_NODE, { id: userId })
      .matchNode(foodLabel, FOOD_NODE, { name: foodData.name })
      .raw(
        `
        CREATE (${userLabel}) -[relation:EAT{ date: ${date}, eatingNb: ${eatingNb} }]-> (${foodLabel})
      `,
      )
      .return('relation')
      .run();

    return result;
  }
}
