export type FoodData = {
  name: string;
  eatingNb: number;
};

export class FoodEntity {
  private name: string;
  private eatingNb: number;

  constructor(foodData: FoodData) {
    this.init(foodData);
  }

  private init(foodData: FoodData) {
    this.name = foodData.name;
    this.eatingNb = foodData.eatingNb;
  }

  get getDatas(): FoodData {
    return {
      name: this.name,
      eatingNb: this.eatingNb,
    };
  }

  get getName(): string {
    return this.name;
  }

  get getEatingNb(): number {
    return this.eatingNb;
  }
}
