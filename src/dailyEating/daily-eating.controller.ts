import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators';
import { DailyEatingService } from './daily-eating.service';
import { CreateDailyEatingDto } from './dto';

@Controller('daily-eating')
@ApiTags('dailyEating')
export class DailyEatingController {
  constructor(private readonly dailyEatingService: DailyEatingService) {}

  @Post()
  async create(@Body() createDailyEatingDto: CreateDailyEatingDto) {
    return this.dailyEatingService.create(createDailyEatingDto);
  }
}
