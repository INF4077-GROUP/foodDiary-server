import { Module } from '@nestjs/common';
import { FoodRepository } from './food.service';

@Module({
  providers: [FoodRepository],
  exports: [FoodRepository],
})
export class FoodModule {}
