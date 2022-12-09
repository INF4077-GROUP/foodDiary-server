import { FoodData } from './food.entity';
import { LiquidData } from './liquid.entity';
import { SickData } from './sick.entity';
import { VegetableData } from './vegetable.entity';

export type DayHabitData = {
  foods: FoodData[];
  vegetables: VegetableData[];
  liquids: LiquidData[];
  sicks: SickData[];
  toiletNb: number;
};

export class DayHabit {
  private foods: FoodData[];
  private vegetables: VegetableData[];
  private liquids: LiquidData[];
  private sicks: SickData[];
  private toiletNb: number;

  constructor(dayHabitDatas: DayHabitData) {
    this.init(dayHabitDatas);
  }

  private init(dayHabitDatas: DayHabitData) {
    this.foods = dayHabitDatas.foods;
    this.vegetables = dayHabitDatas.vegetables;
    this.liquids = dayHabitDatas.liquids;
    this.sicks = dayHabitDatas.sicks;
    this.toiletNb = dayHabitDatas.toiletNb;
  }

  get getDatas(): DayHabitData {
    return {
      foods: this.foods,
      vegetables: this.vegetables,
      liquids: this.liquids,
      sicks: this.sicks,
      toiletNb: this.toiletNb,
    };
  }

  get getFoods(): FoodData[] {
    return this.foods;
  }

  get getVegetables(): VegetableData[] {
    return this.vegetables;
  }

  get getLiquits(): LiquidData[] {
    return this.liquids;
  }

  get getSicks(): SickData[] {
    return this.sicks;
  }

  get getToiletNb(): number {
    return this.toiletNb;
  }
}
