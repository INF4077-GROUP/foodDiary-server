export type FoodData = {
  id: string;
  name: string;
  eatingNb: number;
};

export class FoodEntity {
  private id: string;
  private name: string;
  private eatingNb: number;

  constructor(foodData: FoodData) {
    this.init(foodData);
  }

  private init(foodData: FoodData) {
    this.id = foodData.id;
    this.name = foodData.name;
    this.eatingNb = foodData.eatingNb;
  }
  get datas() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getEatingNb(): number {
    return this.eatingNb;
  }
}
