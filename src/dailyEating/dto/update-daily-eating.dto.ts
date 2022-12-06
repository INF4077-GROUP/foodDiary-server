import { PartialType } from '@nestjs/swagger';
import { CreateDailyEatingDto } from './create-daily-eating.dto';

export class UpdateDailyEatingDto extends PartialType(CreateDailyEatingDto) {}
