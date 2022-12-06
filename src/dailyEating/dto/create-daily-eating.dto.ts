import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export type OtherLiquid = {
  name: string;
  quantity: number;
};

export class CreateDailyEatingDto {
  @IsString()
  readonly foodName: string;

  @IsNumber()
  readonly eatingNb: number;

  @IsNumber()
  readonly waterQuantity: number;

  @IsArray()
  @IsOptional()
  readonly otherLiquid?: OtherLiquid[];

  @IsArray()
  @IsOptional()
  readonly fruits?: string[];

  @IsArray()
  @IsOptional()
  readonly legumes?: string[];

  @IsNumber()
  readonly bowelNb: number;

  @IsArray()
  @IsOptional()
  readonly health?: string[];
}
