import { Module } from '@nestjs/common';
import { FoodModule } from 'src/domain/nodes/food/food.module';
import { LiquidModule } from 'src/domain/nodes/liquid/liquid.module';
import { VegetableModule } from 'src/domain/nodes/vegetable/vegetable.module';
import { DailyEatingController } from './daily-eating.controller';
import { DailyEatingService } from './daily-eating.service';

@Module({
  imports: [FoodModule, VegetableModule, LiquidModule],
  controllers: [DailyEatingController],
  providers: [DailyEatingService],
})
export class DailyEatingModule {}
