import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { FOOD_NODE } from 'src/common/common.constant';
import { CommonRepository } from '../common/common.service';

@Injectable()
export class FoodRepository {
  private static readonly food = FOOD_NODE.toLocaleLowerCase();

  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly commonRepository: CommonRepository,
  ) {}

  async create(createFoodDto: { name: string; quantity: number }) {
    const query = this.neo4jService.initQuery();

    const { name } = createFoodDto;

    const nameToFind = name.toLocaleLowerCase().trim();

    const [result] = await this.commonRepository.findOneByName(
      FOOD_NODE,
      nameToFind,
    );

    if (result) {
      return console.log('alrady exists.');
    }

    const [foodData] = await query
      .createNode(FoodRepository.food, FOOD_NODE, {
        ...createFoodDto,
      })
      .return(FoodRepository.food)
      .run();

    return foodData;
  }
}
