import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { FOOD_NODE, USER_NODE } from 'src/common/common.constant';
import { CommonRepository } from '../common/common.service';

@Injectable()
export class FoodRepository {
  private static readonly food = FOOD_NODE.toLocaleLowerCase();

  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly commonRepository: CommonRepository,
  ) {}

  async createUserEatFood(
    userId: string,
    foodName: string,
    properties: { date: number; eatingNb: number },
  ) {
    const query = this.neo4jService.initQuery();

    const userLabel = USER_NODE.toLocaleLowerCase();
    const foodLabel = FOOD_NODE.toLocaleLowerCase();

    const { date, eatingNb } = properties;

    const result = await query
      .matchNode(userLabel, USER_NODE, { id: userId })
      .matchNode(foodLabel, FOOD_NODE, { name: foodName })
      .raw(
        `
        CREATE (${userLabel}) -[relation:EAT{ date: ${date}, eatingNb: ${eatingNb} }]-> (${foodLabel})
      `,
      )
      .return('relation')
      .run();

    return result;
  }

  async prayloadFood(foodName: string) {
    const nameFood = foodName.toLocaleLowerCase();

    const [foodExist] = await this.commonRepository.findOneByName(
      FOOD_NODE,
      nameFood,
    );

    if (!foodExist)
      await this.commonRepository.create(FOOD_NODE, { name: nameFood });
  }
}
