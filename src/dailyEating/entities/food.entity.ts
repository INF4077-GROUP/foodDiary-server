export type FoodType = {
  id: string;
  name: string;
};

export class FoodEntity {
  private id: string;
  private name: string;

  constructor(foodData: FoodType) {
    this.init(foodData);
  }

  private init(foodData: FoodType) {
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
