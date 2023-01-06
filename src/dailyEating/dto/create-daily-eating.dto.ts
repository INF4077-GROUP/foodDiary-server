import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export type OtherLiquid = {
  name: string;
  quantity: number;
};

type Food = {
  name: string;
  eatingNb: number;
};

export class CreateDailyEatingDto {
  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @IsArray()
  readonly foods: Food[];

  @IsString()
  @IsNotEmpty()
  readonly foodImage: string;

  @IsNumber()
  @IsPositive()
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
  @IsPositive()
  readonly bowelNb: number;

  @IsArray()
  @IsOptional()
  readonly health?: string[];
}
