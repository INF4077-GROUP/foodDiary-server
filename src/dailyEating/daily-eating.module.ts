import { Module } from '@nestjs/common';
import { BowelModule } from 'src/domain/nodes/bowel/bowel.module';
import { FoodModule } from 'src/domain/nodes/food/food.module';
import { LiquidModule } from 'src/domain/nodes/liquid/liquid.module';
import { SickModule } from 'src/domain/nodes/sick/sick.module';
import { VegetableModule } from 'src/domain/nodes/vegetable/vegetable.module';
import { DailyEatingController } from './daily-eating.controller';
import { DailyEatingService } from './daily-eating.service';

@Module({
  imports: [FoodModule, VegetableModule, LiquidModule, SickModule, BowelModule],
  controllers: [DailyEatingController],
  providers: [DailyEatingService],
})
export class DailyEatingModule {}
