import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dto';
import { DailyEatingService } from './daily-eating.service';
import { CreateDailyEatingDto, UpdateDailyEatingDto } from './dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { UploadOperations } from 'src/upload-file/utils';

@Controller('daily-eating')
@ApiTags('dailyEating')
export class DailyEatingController {
  constructor(private readonly dailyEatingService: DailyEatingService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('foodImage', {
      storage: diskStorage({
        destination: UploadOperations.getDestination,
        filename: UploadOperations.getFilename,
      }),
    }),
  )
  async create(
    @GetUser('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    foodImage: Express.Multer.File,
    @Body() createDailyEatingDto: CreateDailyEatingDto,
  ) {
    console.log({ foodImage });

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

  @Patch(':day')
  async update(
    userId: string,
    @Param('day', ParseIntPipe) day: number,
    @Body() updateDailyEatingDto: UpdateDailyEatingDto,
  ) {
    return this.dailyEatingService.update(userId, day, updateDailyEatingDto);
  }
}
