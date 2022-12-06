export type FoodData = {
  id: string;
  name: string;
};

export class FoodEntity {
  private id: string;
  private name: string;

  constructor(foodData: FoodData) {
    this.init(foodData);
  }

  private init(foodData: FoodData) {
    this.id = foodData.id;
    this.name = foodData.name;
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }
}
