import { Injectable } from '@nestjs/common';
import { BowelRepository } from 'src/domain/nodes/bowel/bowel.service';
import { FoodRepository } from 'src/domain/nodes/food/food.service';
import { EatType, FoodType } from 'src/domain/nodes/food/types';
import { LiquidRepository } from 'src/domain/nodes/liquid/liquid.service';
import { DrinkType, LiquidType } from 'src/domain/nodes/liquid/types';
import { SickRepository } from 'src/domain/nodes/sick/sick.service';
import { HaveType, SickType } from 'src/domain/nodes/sick/types';
import { ConsumeType, VegetableType } from 'src/domain/nodes/vegetable/types';
import { FRUIT, LEGUME } from 'src/domain/nodes/vegetable/vegetable.constants';
import { VegetableRepository } from 'src/domain/nodes/vegetable/vegetable.service';
import { CreateDailyEatingDto, OtherLiquid } from './dto';

@Injectable()
export class DailyEatingService {
  constructor(
    private readonly foodRepository: FoodRepository,
    private readonly vegetableRopository: VegetableRepository,
    private readonly liquidRepository: LiquidRepository,
    private readonly sickRepository: SickRepository,
    private readonly bowelRepository: BowelRepository,
  ) {}

  async create(userId: string, createDailyEatingDto: CreateDailyEatingDto) {
    const {
      foods,
      fruits,
      legumes,
      otherLiquid,
      waterQuantity,
      health,
      bowelNb,
    } = createDailyEatingDto;

    // New date
    const date = Date.now();

    await Promise.all(
      foods.map(async (food) =>
        this.preloadFoodAndRelations(
          userId,
          { name: food.name },
          {
            date,
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
            date
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
            date
          },
        ),
      ),
    );

    const liquids: OtherLiquid[] = [
      { name: 'water', quantity: waterQuantity },
      ...otherLiquid,
    ];

    const result = await Promise.all(
      liquids.map((liquid) =>
        this.preloadLiquidAndRelations(
          userId,
          { name: liquid.name },
          { date, quantity: liquid.quantity },
        ),
      ),
    );

    await Promise.all(
      health.map((sickName) =>
        this.preloadSickAndRelations(
          userId,
          { name: sickName },
          { date },
        ),
      ),
    );

    await this.bowelRepository.createUserWhenBowel(userId, {
      date: Date.now(),
      bowelNb,
    });

    return {
      data: 'created',
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

  private async preloadLiquidAndRelations(
    userId: string,
    liquidData: LiquidType,
    drinkData: DrinkType,
  ) {
    await this.liquidRepository.preloadLiquid(liquidData);

    const [result] = await this.liquidRepository.createUserDrinkLiquid(
      userId,
      liquidData.name,
      drinkData,
    );

    return result.relation.properties;
  }

  private async preloadSickAndRelations(
    userId: string,
    sickData: SickType,
    haveData: HaveType,
  ) {
    await this.sickRepository.preloadSick(sickData);

    const [result] = await this.sickRepository.createUserHaveSick(
      userId,
      sickData.name,
      haveData,
    );

    return result.relation.properties;
  }
}
