import { Injectable } from '@nestjs/common';
import { FoodRepository } from 'src/domain/nodes/food/food.service';
import { EatType, FoodType } from 'src/domain/nodes/food/types';
import { ConsumeType, VegetableType } from 'src/domain/nodes/vegetable/types';
import { FRUIT, LEGUME } from 'src/domain/nodes/vegetable/vegetable.constants';
import { VegetableRepository } from 'src/domain/nodes/vegetable/vegetable.service';
import { CreateDailyEatingDto } from './dto';

@Injectable()
export class DailyEatingService {
  constructor(
    private readonly foodRepository: FoodRepository,
    private readonly vegetableRopository: VegetableRepository,
  ) {}

  async create(userId: string, createDailyEatingDto: CreateDailyEatingDto) {
    const { foods, fruits, legumes } = createDailyEatingDto;

    await Promise.all(
      foods.map(async (food) =>
        this.preloadFoodAndRelations(
          userId,
          { name: food.name },
          {
            date: Date.now(),
            eatingNb: food.eatingNb,
          },
        ),
      ),
    );

    await Promise.all(
      fruits.map(async (fruitName) =>
        this.preloadVegetableAndRelations(
          userId,
          {
            type: FRUIT,
            name: fruitName,
          },
          {
            date: Date.now(),
          },
        ),
      ),
    );

    await Promise.all(
      legumes.map(async (legumeName) =>
        this.preloadVegetableAndRelations(
          userId,
          {
            type: LEGUME,
            name: legumeName,
          },
          {
            date: Date.now(),
          },
        ),
      ),
    );

    return {
      data: true,
    };
  }

  private async preloadFoodAndRelations(
    userId: string,
    foodData: FoodType,
    eatData: EatType,
  ) {
    await this.foodRepository.preloadFood(foodData);

    const [result] = await this.foodRepository.createUserEatFood(
      userId,
      foodData,
      eatData,
    );

    return result.relation.properties;
  }

  private async preloadVegetableAndRelations(
    userId: string,
    vegetableData: VegetableType,
    consumeData: ConsumeType,
  ) {
    await this.vegetableRopository.preloadVegetable(vegetableData);

    const [result] = await this.vegetableRopository.createUserConsumeVegetable(
      userId,
      vegetableData.name,
      consumeData,
    );

    return result.relation.properties;
  }
}
