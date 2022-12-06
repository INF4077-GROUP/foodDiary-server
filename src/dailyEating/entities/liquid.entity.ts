export type LiquidData = {
  id: string;
  name: string;
  quantity: number;
};

export class Liquid {
  private id: string;
  private name: string;
  private quantity: number;

  constructor(liquitData: LiquidData) {
    this.init(liquitData);
  }

  private init(liquidData: LiquidData) {
    this.id = liquidData.id;
    this.name = liquidData.name;
    this.quantity = liquidData.quantity;
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getQuantity(): number {
    return this.quantity;
  }
}
