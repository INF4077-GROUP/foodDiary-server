export type SickData = {
  name: string;
};

export class Sick {
  private name: string;

  constructor(sickData: SickData) {
    this.init(sickData);
  }

  private init(sickData: SickData) {
    this.name = sickData.name;
  }

  get getName() {
    return this.name;
  }

  get getDatas(): SickData {
    return {
      name: this.name,
    };
  }
}
