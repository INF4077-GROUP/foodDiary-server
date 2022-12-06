import { Injectable } from '@nestjs/common';

@Injectable()
export class DailyEatingService {
  async create() {
    return { daily: 'eating boy !!' };
  }
}
