export type LiquidData = {
  name: string;
  quantity: number;
};

export class Liquid {
  private name: string;
  private quantity: number;

  constructor(liquidData: LiquidData) {
    this.init(liquidData);
  }

  private init(liquidData: LiquidData) {
    this.name = liquidData.name;
    this.quantity = liquidData.quantity;
  }

  get getDatas(): LiquidData {
    return {
      name: this.name,
      quantity: this.quantity,
    };
  }

  get getName(): string {
    return this.name;
  }

  get getQuantity(): number {
    return this.quantity;
  }
}
