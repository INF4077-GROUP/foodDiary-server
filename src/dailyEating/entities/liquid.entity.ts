export type LiquidData = {
  id: string;
  name: string;
};

export class Liquid {
  private id: string;
  private name: string;

  constructor(liquitData: LiquidData) {
    this.init(liquitData);
  }

  private init(liquidData: LiquidData) {
    this.id = liquidData.id;
    this.name = liquidData.name;
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }
}
