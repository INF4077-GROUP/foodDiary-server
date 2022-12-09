import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dto';
import { DailyEatingService } from './daily-eating.service';
import { CreateDailyEatingDto, UpdateDailyEatingDto } from './dto';

@Controller('daily-eating')
@ApiTags('dailyEating')
export class DailyEatingController {
  constructor(private readonly dailyEatingService: DailyEatingService) {}

  @Post()
  async create(
    @GetUser('id') userId: string,
    @Body() createDailyEatingDto: CreateDailyEatingDto,
  ) {
    return this.dailyEatingService.create(userId, createDailyEatingDto);
  }

  @Get()
  async getAll(
    @GetUser('id') userId: string,
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.dailyEatingService.getAll(userId, paginationDto);
  }

  @Get(':day')
  async getOne(
    @GetUser('id') userId: string,
    @Param('day', ParseIntPipe) day: number,
  ) {
    return this.dailyEatingService.getOne(userId, day);
  }

  @Patch(':day')
  async update(
    userId: string,
    @Param('day', ParseIntPipe) day: number,
    @Body() updateDailyEatingDto: UpdateDailyEatingDto,
  ) {
    return this.dailyEatingService.update(userId, day, updateDailyEatingDto);
  }
}
