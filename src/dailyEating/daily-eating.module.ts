import { Module } from '@nestjs/common';
import { FoodModule } from 'src/domain/nodes/food/food.module';
import { DailyEatingController } from './daily-eating.controller';
import { DailyEatingService } from './daily-eating.service';

@Module({
  imports: [FoodModule],
  controllers: [DailyEatingController],
  providers: [DailyEatingService],
})
export class DailyEatingModule {}
