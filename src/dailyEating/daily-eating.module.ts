import { Module } from '@nestjs/common';
import { DailyEatingController } from './daily-eating.controller';
import { DailyEatingService } from './daily-eating.service';

@Module({
  controllers: [DailyEatingController],
  providers: [DailyEatingService],
})
export class DailyEatingModule {}
