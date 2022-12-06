import { IsString } from 'class-validator';
import { OtherLiquid } from '../types';

export class CreateDailyEatingDto {
  readonly foodName: string;

  readonly eatingNb: number;

  readonly waterQuantity: number;

  readonly otherLiquid?: OtherLiquid[];

  readonly fruits?: string[];

  readonly legumes?: string[];

  readonly bowelNb: number;

  readonly health?: string[];
}
