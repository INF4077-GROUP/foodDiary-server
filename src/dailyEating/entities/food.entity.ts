export type FoodData = {
  name: string;
  eatingNb: number;
  image: string;
};

export class FoodEntity {
  private name: string;
  private eatingNb: number;
  private image: string;

  constructor(foodData: FoodData) {
    this.init(foodData);
  }

  private init(foodData: FoodData) {
    this.name = foodData.name;
    this.eatingNb = foodData.eatingNb;
    this.image = foodData.image;
  }

  get getDatas(): FoodData {
    return {
      name: this.name,
      eatingNb: this.eatingNb,
      image: this.image,
    };
  }

  get getName(): string {
    return this.name;
  }

  get getEatingNb(): number {
    return this.eatingNb;
  }

  get getImage(): string {
    return this.image;
  }
}
