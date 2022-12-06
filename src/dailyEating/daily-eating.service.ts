import { Injectable } from '@nestjs/common';
import { FOOD_NODE, USER_NODE } from 'src/common/common.constant';
import { CommonRepository } from 'src/domain/nodes/common/common.service';
import { CreateDailyEatingDto } from './dto';

@Injectable()
export class DailyEatingService {
  constructor(private readonly commonRepository: CommonRepository) {}

  async create(userId: string, createDailyEatingDto: CreateDailyEatingDto) {
    const food = createDailyEatingDto.foods[0];

    const [foodExist] = await this.commonRepository.findOneByName(
      FOOD_NODE,
      food.name,
    );

    if (foodExist) {
      /**
       * @TODO create relationship between user and food with 2 propertie(data, quantity)
       */

      const [result] = await this.commonRepository.createRelation(
        USER_NODE,
        userId,
        FOOD_NODE,
        food.name,
      );

      return result;
    }

    const [foodData] = await this.commonRepository.create(FOOD_NODE, {
      name: food.name,
    });

    /**
     * @TODO create relationship between user and food with 2 propertie(data, quantity)
     */

    return foodData;
  }
}
