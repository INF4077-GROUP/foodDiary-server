import { Injectable } from '@nestjs/common';
import { CreateDailyEatingDto } from './dto';

@Injectable()
export class DailyEatingService {
  async create(createDailyEatingDto: CreateDailyEatingDto) {
    return createDailyEatingDto;
  }
}
