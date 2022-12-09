import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly limit?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly offset?: number;
}
