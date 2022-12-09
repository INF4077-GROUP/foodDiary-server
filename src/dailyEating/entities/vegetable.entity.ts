export type VegetableTypes = 'FRUIT' | 'LEGUME';

export type VegetableData = {
  type: VegetableTypes;
  name: string;
};

export class Vegetable {
  private name: string;
  private type: VegetableTypes;

  constructor(vegetebleData: VegetableData) {
    this.init(vegetebleData);
  }

  private init(vegetableData: VegetableData) {
    this.name = vegetableData.name;
    this.type = vegetableData.type;
  }

  get getDatas(): VegetableData {
    return {
      name: this.name,
      type: this.type,
    };
  }

  get getName() {
    return this.name;
  }

  get getType() {
    return this.type;
  }
}
