export type VegetableTypes = 'FRUIT' | 'LEGUME';

export type VegetableData = {
  id: string;
  type: VegetableTypes;
  name: string;
};

export class Vegetable {
  private id: string;
  private name: string;
  private type: VegetableTypes;

  constructor(vegetebleData: VegetableData) {
    this.init(vegetebleData);
  }

  private init(vegetableData: VegetableData) {
    this.id = vegetableData.id;
    this.name = vegetableData.name;
    this.type = vegetableData.type;
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getType() {
    return this.type;
  }
}
