import { Controller, Post } from '@nestjs/common';
import { DailyEatingService } from './daily-eating.service';

@Controller('daily-eating')
export class DailyEatingController {
  constructor(private readonly dailyEatingService: DailyEatingService) {}

  @Post()
  async create() {
    return this.dailyEatingService.create();
  }
}
