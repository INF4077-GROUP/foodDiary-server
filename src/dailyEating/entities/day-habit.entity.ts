import { FoodEntity } from './food.entity';
import { Liquid } from './liquid.entity';
import { Sick } from './sick.entity';
import { Vegetable } from './vegetable.entity';

export type DayHabitData = {
  day: number;
  foods: FoodEntity[];
  vegetables?: Vegetable[];
  liquids?: Liquid[];
  sicks?: Sick[];
  toiletNb?: number;
};

export class DayHabit {
  private day: number;
  private foods: FoodEntity[];
  private vegetables: Vegetable[];
  private liquids: Liquid[];
  private sicks: Sick[];
  private toiletNb: number;

  constructor(dayHabitDatas: DayHabitData) {
    this.init(dayHabitDatas);
  }

  private init(dayHabitDatas: DayHabitData) {
    this.day = dayHabitDatas.day;
    this.foods = dayHabitDatas.foods;
    this.vegetables = dayHabitDatas.vegetables || [];
    this.liquids = dayHabitDatas.liquids || [];
    this.sicks = dayHabitDatas.sicks || [];
    this.toiletNb = dayHabitDatas.toiletNb || 0;
  }

  // Getters

  get getDatas(): DayHabitData {
    return {
      day: this.day,
      foods: this.foods,
      vegetables: this.vegetables,
      liquids: this.liquids,
      sicks: this.sicks,
      toiletNb: this.toiletNb,
    };
  }

  get getDay() {
    return this.day;
  }

  get getFoods(): FoodEntity[] {
    return this.foods;
  }

  get getVegetables(): Vegetable[] {
    return this.vegetables;
  }

  get getLiquits(): Liquid[] {
    return this.liquids;
  }

  get getSicks(): Sick[] {
    return this.sicks;
  }

  get getToiletNb(): number {
    return this.toiletNb;
  }

  // Methods
  addFood(food: FoodEntity) {
    this.foods.push(food);
  }

  addVegetable(vegetables: Vegetable[]) {
    this.vegetables = vegetables;
  }

  addLiquid(liquids: Liquid[]) {
    this.liquids = liquids;
  }

  addSick(sicks: Sick[]) {
    this.sicks = sicks;
  }

  setToiletNb(nb: number) {
    this.toiletNb = nb;
  }
}
