import { Injectable } from '@nestjs/common';
import { FOOD_NODE } from 'src/common/common.constant';
import { CommonRepository } from 'src/domain/nodes/common/common.service';
import { FoodRepository } from 'src/domain/nodes/food/food.service';
import { CreateDailyEatingDto } from './dto';

@Injectable()
export class DailyEatingService {
  constructor(
    private readonly commonRepository: CommonRepository,
    private readonly foodRepository: FoodRepository,
  ) {}

  async create(userId: string, createDailyEatingDto: CreateDailyEatingDto) {
    const result = await Promise.all(
      createDailyEatingDto.foods.map(async (food) =>
        this.preloadFoodAndRelations(userId, food.name, {
          date: Date.now(),
          eatingNb: food.eatingNb,
        }),
      ),
    );

    return result;
  }

  private async preloadFoodAndRelations(
    userId: string,
    foodName: string,
    eatRelationProperties: { date: number; eatingNb: number },
  ) {
    await this.foodRepository.prayloadFood(foodName);

    //create "eat" relation
    const [result] = await this.foodRepository.createUserEatFood(
      userId,
      foodName,
      {
        date: eatRelationProperties.date,
        eatingNb: eatRelationProperties.eatingNb,
      },
    );

    return result.relation.properties;
  }
}
