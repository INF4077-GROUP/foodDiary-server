import { IsArray, IsNumber, IsOptional } from 'class-validator';

export type OtherLiquid = {
  name: string;
  quantity: number;
};

type Food = {
  name: string;
  eatingNb: number;
};

export class CreateDailyEatingDto {
  @IsArray()
  readonly foods: Food[];

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
