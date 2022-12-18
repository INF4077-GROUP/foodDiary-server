import { Liquid } from './entities/liquid.entity';
import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import {
  LIQUID_NODE,
  USER_NODE,
  VEGETABLE_NODE,
  FOOD_NODE,
  EAT,
  DRINK,
} from 'src/common/constants';
import { PaginationDto } from 'src/common/dto';
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
import { CreateDailyEatingDto, OtherLiquid, UpdateDailyEatingDto } from './dto';
import { DayHabit, FoodEntity } from './entities';

@Injectable()
export class DailyEatingService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly foodRepository: FoodRepository,
    private readonly vegetableRopository: VegetableRepository,
    private readonly liquidRepository: LiquidRepository,
    private readonly sickRepository: SickRepository,
    private readonly bowelRepository: BowelRepository,
  ) {}

  async getAll(userId: string, pagination: PaginationDto) {
    const query = this.neo4jService.initQuery();

    const foodLabel = FOOD_NODE.toLocaleLowerCase();
    const userLabel = USER_NODE.toLocaleLowerCase();

    const eatRelation = EAT.toLocaleLowerCase();

    // Final data
    const daysHabit: DayHabit[] = [];

    // Step 1: Getting Foods

    // Get all food
    const results = await query
      .matchNode(foodLabel, FOOD_NODE)
      .matchNode(userLabel, USER_NODE, { id: userId })
      .raw(
        `
        MATCH (${userLabel}:${USER_NODE})-[${eatRelation}:${EAT}]->(${foodLabel}:${FOOD_NODE})
      `,
      )
      .return([foodLabel, eatRelation])
      .run();

    // Extract data from results
    const response = {};

    if (results.length > 0) {
      for (let result of results) {
        // Extract result data
        const eatRelationData = result[eatRelation].properties;
        const foodData = result[foodLabel].properties;

        const data = {
          ...foodData,
          number: eatRelationData.eatingNb,
        };

        const date = new Date(eatRelationData.date).getTime();

        if (response[date]) {
          response[date] = [...response[date], data];
        } else {
          response[date] = [data];
        }
      }
    }

    // structure the response into the DayHabit entity
    for (let element of Object.entries<any>(response)) {
      // Extract date and foods list
      const [date, foodsData] = element;
      const foods: FoodEntity[] = [];

      // For each food create a food object
      for (let food of foodsData) {
        const payload = { name: food.name, eatingNb: food.number };
        foods.push(new FoodEntity(payload));
      }

      // Create a dayHabit
      daysHabit.push(
        new DayHabit({
          day: Number(date),
          foods,
        }),
      );
    }

    // Step 2: Getting Liquids

    // Get Data from database
    const liquidResponse = await this.getAllLiquid(userId);

    // structure the response into the DayHabit entity
    for (let element of liquidResponse) {
      // Extract date and foods list
      const [date, liquidsData] = element;
      const liquids: Liquid[] = [];

      // For each food create a food object
      for (let liquid of liquidsData) {
        const payload = { name: liquid.name, quantity: liquid.number };
        liquids.push(new Liquid(payload));
      }

      // Get index of the day habit base on the date
      const index = daysHabit.findIndex((day) => day.getDay === Number(date));

      if (index !== -1) {
        // Add liquids into the daysHabit
        daysHabit[index].addLiquid(liquids);
      }
    }

    return daysHabit;
  }

  async getAllLiquid(userId: string) {
    const query = this.neo4jService.initQuery();

    const liquidLabel = LIQUID_NODE.toLocaleLowerCase();
    const userLabel = USER_NODE.toLocaleLowerCase();
    const drinkRelation = DRINK.toLocaleLowerCase();

    // Preparing the request
    const results = await query
      .matchNode(liquidLabel, LIQUID_NODE)
      .matchNode(userLabel, USER_NODE, { id: userId })
      .raw(
        `
        MATCH (${userLabel}:${USER_NODE})-[${drinkRelation}:${DRINK}]->(${liquidLabel}:${LIQUID_NODE})
      `,
      )
      .return([liquidLabel, drinkRelation])
      .run();

    // Extracting data from results

    const response = {};

    if (results.length > 0) {
      for (let result of results) {
        // Extract result data
        const drinkRelationData = result[drinkRelation].properties;
        const liquidData = result[liquidLabel].properties;

        const data = {
          ...liquidData,
          number: drinkRelationData.quantity,
        };

        const date = new Date(drinkRelationData.date).getTime();

        if (response[date]) {
          response[date] = [...response[date], data];
        } else {
          response[date] = [data];
        }
      }
    }

    return Object.entries<any>(response);
  }

  async update(
    userId: string,
    day: number,
    updateDailyEatingDto: UpdateDailyEatingDto,
  ) {
    return updateDailyEatingDto;
  }

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

    const date: string = new Date().toDateString();

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
            date,
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
            date,
          },
        ),
      ),
    );

    const liquids: OtherLiquid[] = [
      { name: 'water', quantity: waterQuantity },
      ...otherLiquid,
    ];

    await Promise.all(
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
        this.preloadSickAndRelations(userId, { name: sickName }, { date }),
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
